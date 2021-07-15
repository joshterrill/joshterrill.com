---
title: Where does all the money go? (Analyzing Government Documents Part 1)
description: The US government is notorious for passing bills that are so long, no one reads them. We get the "highlights" of what items are in the bill, and many of our representatives vote on that alone. With the passing of the recent "COVID Bill", which is 5,593 pages long, I wanted to find a way to figure out what was in it, and where all the money was going.
date: "2020-03-09T19:21:43.109Z"
published: true
---

The US government is notorious for passing bills that are so long, no one reads them. We get the "highlights" of what items are in the bill, and many of our representatives vote on that alone. With the passing of the recent "COVID Bill", which is 5,593 pages long, I wanted to find a way to figure out what was in it, and where all the money was going.

An article titled <a href="https://www.usnews.com/news/politics/articles/2020-12-21/too-big-to-read-giant-bill-a-leap-of-faith-for-congress" target="_blank">Too Big to Read: Giant Bill a Leap of Faith for Congress</a> explains that it is the longest bill in known US history, and it was released for review **2 hours** before the house and senate voted on it.

What can we do about this? We can write some code to extract every mention of a dollar amount as well as look at any mentions of dollar amounts that are going to other countries.

### Step 1 - Cleaning up the document

All US bills are published online at <a href="https://rules.house.gov" target="_blank">https://rules.house.gov</a> in PDF format. This bill can be found here: <a href="https://rules.house.gov/sites/democrats.rules.house.gov/files/BILLS-116HR133SA-RCP-116-68.pdf" target="_blank">https://rules.house.gov/sites/democrats.rules.house.gov/files/BILLS-116HR133SA-RCP-116-68.pdf</a>

And I found a mirror of it that allowed me to download a text version of it here: <a href="https://beta.documentcloud.org/documents/20433443-bills-116hr133sa-rcp-116-68" target="_blank">https://beta.documentcloud.org/documents/20433443-bills-116hr133sa-rcp-116-68</a>

Now we can load the document into a python script and begin cleaning the data.

```python
# load covid bill text
path = "./bills-116hr133sa-rcp-116-68.txt"
f = open(path, "r")
text = f.read()
print(text) # text from document prints out
```

Looking at the text the first thing I see are several repeating headers, footers, and some nasty ascii characters that we'll want to ignore. We can get rid of those by processsing the text through some `replace()` functions.

```python
text = text.encode("ascii", "ignore")
text = text.decode()
text = text.replace("U:\\2021OMNI\\Final\\DivA-M2.xml SEN. APPRO.", "")
text = text.replace("U:\\2021OMNI\\14OMNI\\DivO-FF.xml SEN.", "")
text = text.replace("U:\\2021OMNI\\Final\\H133JLHS68.xml", "")
text = text.replace("December 21, 2020 (12:59 p.m.)\x00", "")
text = text.replace("December 21, 2020 (10:27 a.m.)\x00", "")
```

Someone who is much better than me at regex could do this in a couple of lines of code, but this is fine for me.

The next thing I'm noticing is there are several places in the document that have multiple spaces where there should only be one, and there are many places in the text where numbers show up in the middle of text against a letter or word. So we can take that out with:

```python
text = text.replace("  ", " ")
text = re.sub('[a-z][0-9] [a-z]', '', text)
text = re.sub('[a-z][0-9][0-9] [a-z]', '', text)
```

Finally, we can split the text up by new lines, and take a pass at it to remove all of the line numbers the show up at the beginning of many lines and store our final clean text in a new string.

```python
cleaner_text = ""

for row in text.split("\n"):
    if row != "":
        if re.search("[0-9]", row[:1]):
            row = row.replace(row.split(" ")[0], "")
        cleaner_text += row.strip() + "\n"

```

The last step in our text processing is to split the entire document up into an array of complete sentences. I didn't know how to do this initially (like I said above, I'm not great at regex), so <a href="https://stackoverflow.com/questions/65769689/regex-find-all-complete-sentences-in-a-string" target="new">I asked on StackOverflow</a> and a person named <a hre="https://stackoverflow.com/users/14877544/mitchell-olislagers" target="new">Mitchell Olislagers</a> answered my question.

```python
regex = "(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s"
splitted = re.split(regex, cleaner_text)
print(splitted) # prints an array of complete sentences from the text
```

### Step 2 - Looking for dollar amounts

To find references to dollar amounts, we'll create a method that loops through each index of the `splitted` array and simply checks to see if the `$` character appears in it. If it does, we'll write that sentence to a file. In this case, I'm writing out to an HTML file, so I've added some formatting such as a heading at the top of the HTML file and each reference to a dollar amount will be inside of an `<li>` tag.

```python
def write_money_references_to_file():
	file_text = "<h1>References to dollar amounts in COVID relief bill</h1>"
	for t in splitted:
		if '$' in t:
			file_text += "<li>" + t + "</li>"
			file_text += "<br />"
	f = open("./referenced-dollars.html", "w")
	f.write(file_text)
	f.close()
```

### Step 3 - Looking for money given to other countries

I thought it might be interesting to also check where dollar amounts and names of non-US countries might be referenced. It's a very similar process to the above method, except we need to get a list of all non-US countries, and add another condition to our if statement.

There are many lists of countries online, this is the one I used: <a href="https://gist.github.com/incredimike/1469814" target="new">https://gist.github.com/incredimike/1469814</a>

So now you save it into a txt file, read from it, and add another loop.

```python

def write_countries_to_file():
    # load countries list into array from text file
    c = open("countries.txt", "r")
    countries = c.read().split("\n")
    file_text = "<h1>References to dollar amounts given to outside-countries in COVID relief bill</h1>"
    for t in splitted:
       for c in countries:
            if (c + " ") in t and '$' in t:
                file_text += "<h4> " + c + "</h4>"
                file_text += "<br /><br />"
    f = open("./referenced-countries.html", "w")
    f.write(file_text)
    f.close()
```

Now we can run our script and look at the 2 output HTML files.

```bash
python3 script.py
```

### Issues

This obviously isn't perfect. One issue I still see is that there are some very long, drawn out, sentences that contain a lot of fluff, but also contain dollar amounts - it would be great to somehow filter this even more, but I believe that this allows for getting rid of *most* of the fluff and finding the important parts. In this case, it reduces a 5k+ page document to merely hundreds of pages, which is much easier to read and process.

### Source code

All of the code for this, including the bill text file, countries list, and HTML files can be found on my Github here: <a href="https://github.com/joshterrill/covid-relief-bill-dollar-amounts/" target="_blank">https://github.com/joshterrill/covid-relief-bill-dollar-amounts/</a>

The static HTML files can be viewed via:

* <a target="_blank" href="https://rawcdn.githack.com/joshterrill/covid-relief-bill-dollar-amounts/cb661d00170c1109776e105dde13e8331764f92b/referenced-dollars.html">https://rawcdn.githack.com/joshterrill/covid-relief-bill-dollar-amounts/cb661d00170c1109776e105dde13e8331764f92b/referenced-dollars.html</a>
* <a target="_blank" href="https://rawcdn.githack.com/joshterrill/covid-relief-bill-dollar-amounts/cb661d00170c1109776e105dde13e8331764f92b/referenced-countries.html">https://rawcdn.githack.com/joshterrill/covid-relief-bill-dollar-amounts/cb661d00170c1109776e105dde13e8331764f92b/referenced-countries.html</a>

Pull requests and thoughts are welcome.