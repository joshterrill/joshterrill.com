---
title: From zero to mediocre
description: The story of an outsourced software team at a startup
date: "2019-07-10T23:48:03.284Z"
---

### 1. Proper version control workflow

Every project that a software developer works on should be using some sort of version control. The most popular version control system is [Git](https://git-scm.com/), however something like [Subversion](https://subversion.apache.org/) works fine as well - you just need to be using **something**.

Having a good version control workflow is also very important when it comes to being able to keep track of the code that is currently deployed across all of your environments (see point 4), as well as individual features being worked on by team members. A typical git or subversion workflow might look at follows:

  1. The `master` branch is what is currently deployed in production, `qa` branch is what is currently deployed in QA.

  2. When a team member wants to work on a new feature, they checkout the `qa` branch and pull to make sure it's up to date. Then they will create a new feature branch called `my-new-feature` with the following command: `git checkout -b joshterrill/my-new-feature`

  3. Once they finish the feature, they will commit all their changes to the feature branch and switch back to the `qa` branch, pull to update, then switch back to their feature branch and merge `qa` into their feature branch and re-test their code. This ensures that when they are about to merge their branch into `qa`, there will be no conflicts, and they can be certain that nothing that was committed into `qa` while they were working on their feature branch would have broken anything that they did.

  4. A pull request will get created to merge `my-new-feature` into `qa` and reviewed by a member of the team. Once they review it and accept it, it gets merged into `qa`, tesrted in the QA environment, and then merged into `master` and deployed to production.

Being able to interact with your team through their pull requests and being able to reference specific lines of code for praise or critique is a nice thing to have as well. (Github)[https://github.com] and [Gogs](https://gogs.io/) (an open source Github clone) both have the ability to do this.

**How this helped my team**: My team had always used version control, first it was subversion, and then later we switched over to git - but it was still like the wild wild west. We didn't use pull requests, or even branches unless it was deemed a "big enough" feature. This led to tons of code getting released into QA (and even sometimes production), that was buggy or incomplete all together. We installed Gogs on an AWS server, moved our projects over to it, created the `master` and `qa` branches, and then locked them down so that only team leads could push to them. This forced the other team members to create branches and do pull requests against `qa` before their code would be merged by one of the two leads on the team. Implementing this workflow allowed us to catch a lot of issues, whether they be bugs, or misunderstood requirements, before the code ever made it to QA.

![Github pull request feedback example](https://help.github.com/assets/images/help/pull_requests/commit-suggestion-button.png)
*Example of leaving suggestions on a pull request in Github*

### 2. Unit tests + integration tests

Like many other developers that I've spoken with, learning the importance of, and how to write unit tests, was a painful journey, and something that I integrated into my development flow after I had already been coding for a while. For many small companies with small-mid size development teams, unit tests sometimes are something that "would be nice to have" but "just don't have the time" to implement.

Let's explore a scenario where we're on a small team of 4 people, and we don't write unit tests. What does this mean? Obviously the code needs to be tested, but it means that we're the ones testing it. As a project grows, requirements grow, business rules grow, the code base grows. Relying on a human to know how to test every part of an application is impossible, and eventually a complete waste of time. Things are going to get missed. Bugs will end up in production. And your weekends will suck.

Getting in the habit of writing unit tests as a part of your development workflow instead of an after thought is extremely important. With how quick it has gotten to be able to hook a server endpoint up to a client like Angular or React, it's very attractive to build an endpoint and then "test" it by hooking it up to the client and seeing the data come back. But 100% of the time, writing a unit test on the server for checking the response of the endpoint and the existence of all the required properties/values is going to prove much more reliable, and it will scale. It will never forget to test some weird edge-case like a human would. There are several testing frameworks out there, [Mocha](https://mochajs.org/) for javascript languages, JUnit for Java, etc. Another thing that is nice to have is a coverage report which will show you what lines of code are covered by your unit tests, and which are not. Tools like [Istanbul](https://istanbul.js.org/) for javascript languages or [JaCoCo](https://www.baeldung.com/jacoco) for Java give great looking reports.

![JaCoCo Report](https://www.baeldung.com/wp-content/uploads/2016/09/palindrometest1-1.png)
*JaCoCo coverage report*

Writing tests for the client can be a little more tricky, especially single-page applications that frameworks such as React and Angular create. This is due to how much state is managed in the client. I'm personally a fan of writing full integration tests to test the client. Using something like [Cypress](INSERT LINK HERE) allows you to create tests that run your client in a full browser (or headless browser) and gives you a very high-level scripting language to script tests to run through as a user would run through your app.

**How this helped my team**:

#### 4. Linting
      a. Common set of lint rules per language
      b. Extending 

#### 4. Continuous integration + continuous deployment

When you get to a point where you deploy an application to production and you have to manage at least a few different environments that your code needs to run in (i.e. dev, qa/acc, and production) it is extremely valuable to you and the team to implement continuous integration and continuous deployments (CI/CD).

CI/CD gives you the benefit of automating the running and reporting of all of your tests, compiling your code, and deploying it to whatever environment you're running in.

      a. multiple environments
      b. hotfixes
      c. rollbacks
      d. database management
      e. deploying on a schedule

#### 5. Alerts and logging

#### 6. Bug and feature tracking, and team communication

#### 7. 

![Accept Mine](https://i.imgur.com/EdtzEKW.jpg)
