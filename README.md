# Grabdef
A script which grabs definitions of english words from the web

## Setup
To set it up, first download the zip-file. Because this script uses Node-packages, you need to download the dependencies.

### Download the dependencies
1. Download Node.js from the web
2. Navigate with the terminal to the folder where the script is saved. (In the main folder, not the src folder)
3. type in the terminal
    ```
    npm i
    ```
    this will download all the needed dependencies (mainly puppeteer)

## How to use this script
1. Write the vocabs in the following file:
   ```src/vocabs/vocabs.txt```. One line holds one vocab and it needs to be saved like:
   ```
    vocab|word type
   ```
   An example for a vocab list would look like this:
   ```
    adhere|verb
    appoint|verb
    concede|verb
    ginning|noun
    subsidies|noun
    traceable|adjective
    corrugated iron|noun
   ```
   To note:
   - This script makes only use of www.dictionary.com. Any words that are not listed in the dictionary cannot be looked up by the script.
   - Compound words (like e.g. corrugated iron), can be looked up without any problem. They will be handled by the script itself.
   - Verbs with postpositions might be a problem, as those verbs might or might not be saved with their postpositions. If an error occurs, try deleting the postposition from the vocab list
2. Navigate to the main folder in your Terminal
   and type the following command:
   ```
    npm run grabdef
   ```
   This command will start the script. Note that any definitions that previously were in the file will automatically be deleted
3. Your definitions should now be located in the
   file ```src/vocabs/defs.txt```.
#### Thanks for using my script :) 
