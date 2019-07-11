---
title: Signs of a mature software team
description: And how I got my team there
date: "2019-07-10T23:48:03.284Z"
---

This is my first post on my new fake blog! How exciting!

I'm sure I'll write a lot more interesting things in the future.

Oh, and here's a great quote from this Wikipedia on
[salted duck eggs](http://en.wikipedia.org/wiki/Salted_duck_egg).

## 1. Version control and workflow

Every project that a software developer works on should be using some sort of version control. The most popular version control system is [Git](INSERT LINK HERE), however something like [Subversion](INSERT LINK HERE) works fine as well - you just need to be using **something**.

Having a good version control workflow is also very important when it comes to being able to keep track of the code that is currently deployed across all of your environments (see point 4), as well as individual features being worked on by team members. A typical git or subversion workflow might look at follows:

  1. The `master` branch is what is currently deployed in production, `qa` branch is what is currently deployed in QA.

  2. When a team member wants to work on a new feature, they checkout the `qa` branch and pull to make sure it's up to date. Then they will create a new feature branch called `my-new-feature` with the following command: `git checkout -b joshterrill/my-new-feature`

  3. Once they finish the feature, they will commit all their changes to the feature branch and switch back to the `qa` branch, pull to update, then switch back to their feature branch and merge `qa` into their feature branch and re-test their code. This ensures that when they are about to merge their branch into `qa`, there will be no conflicts, and they can be certain that nothing that was committed into `qa` while they were working on their feature branch would have broken anything that they did.

  4. A pull request will get created to merge `my-new-feature` into `qa` and reviewed by a member of the team. Once they review it and accept it, it gets merged into `qa`, tesrted in the QA environment, and then merged into `master` and deployed to production.

Being able to have a front-end where team members can interact with each other on pull requests is extremely important so that team members can leave feedback and reference specific lines of code that should be addressed.

## 2. Unit tests + integration tests
      a. Timelines include time to code unit tests

### 4. Linting
      a. Common set of lint rules per language
      b. Extending 

### 4. Continuous integration + continuous deployment

      a. multiple environments
      b. hotfixes
      c. rollbacks
      d. database management
      e. deploying on a schedule

### 5. Alerts and logging

### 6. Bug and feature tracking, and team communication

### 7. 

![Accept Mine](https://i.imgur.com/EdtzEKW.jpg)
