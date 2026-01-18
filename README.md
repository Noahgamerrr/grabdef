# Grabdef
A script which grabs definitions of english words from the web

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
   ```

2. Navigate to the main folder in your Terminal
   and type the following command:
   ```
    npm run grabdef
   ```
   This command will start the script. Note that any definitions that previously were in the file will automatically be deleted
3. Your definitions should now be located in the
   file ```src/vocabs/defs.txt```.

## Limitations

- Definitions that consist of two or more words cannot be looked up. The same is true for verbs that use a postposition.
- Each vocab takes 1 second to be fetched, since otherwise the script seems to fail.

#### Thanks for using my script :) 
