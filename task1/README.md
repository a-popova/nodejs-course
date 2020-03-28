# Task 1. Caesar cipher CLI tool

**This CLI tool that can be used for encoding and decoding a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)**.

To run the tool from command line you need to enter **node task1/app.js + required and optional parameters** in the Terminal and click 'Enter' keyboard key.

CLI tool accepts 4 options (short alias and full name):

1.  **-s, --shift**: a shift
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file
4.  **-a, --action**: an action encode/decode

A **shift** and **action** are required options it means you need to specify them in any case. **Input** and **Output** may be specified in case there are files you need to encode/decode text from or to. 
Should you not specify input file, the tool will suggest you to enter the text in the command line. To finish process, please, click Ctrl + C.
Should you not specify output file, encoded/decoded text will be returned to the command line.

For encoding/decoding use only the English alphabet.