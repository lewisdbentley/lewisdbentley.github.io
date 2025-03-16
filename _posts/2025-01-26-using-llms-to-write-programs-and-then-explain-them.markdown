---
layout: post
title:  "Using LLMs to write programs and then explain them"
date:   2025-01-26
categories: llm cli
---

When asked on [Hacker News](https://news.ycombinator.com/item?id=42604529) how he balanced building vs writing, Simon Willison said he *Having relevant projects is key. [...]] any time a new API model comes out I can spin up a new plugin to for LLM, which is a great way to try the model with limited development time (most API plugins are a few dozen lines of code).*

Thinking I would like to learn how to create an API plugin, and in doing so create an easy-ish and fun way for me to engage with the fast-moving AI scene, I looked into a way to quickly grasp the LLM code. Here I found another of Simon's tools: [files-to-prompt](https://github.com/simonw/files-to-prompt), which lets you concatenate a directory full of files into a single prompt for use with LLMs

After installing this tool using pip, I was able to use it to run this command:

    files-to-prompt files-to-prompt | llm --system 'Explain this code to me'

Which uses files-to-prompt to create a list of its own innards and pass this to llm to be explained. See also:

    which llm | xargs files-to-prompt | llm -s 'what does the code do please'

Finding the location of the llm command, passing it to files-to-prompt, then getting llm to explain the code.