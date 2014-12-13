#Static doPressKit()

This is a port of Vlambeer/Rami's doPressKit that exports static html files.

**Things this does better:**

- Works as a static site, as indicated in the name.
- The code is more concise.
    - Jade templating. vs. PHP
    - SASS styling. vs. CSS
    - YAML configuration. vs. XML
- You can input markdown for description, history and features.
- Compresses images and css.
- Creates a zip file of all your media.
- Sticky Nav + ScrollSpy.

**Things this does worse:**

- Doesn't have a 'request press copy' feature, since it's not PHP.
- Right now this only produces a game page, not a company page.
- Only produces one game page, not pages for multiple projects.

##Usage

###1. Installation. 

This requires node and npm, and grunt. Navigate to the root folder in a terminal to run the commands in the next steps.

First run:

`npm install`

This will install all the node packages needed to run the gruntfile.

###2. Entering information.

Enter your information in data.yml.

Add your images to the media folder. Note: The media folder is zipped to create a downloadable version of your presskit.

###3. Compilation

Then run:

`grunt`

The output is in the `presskit` directory. Put it on your server where you want the presskit to be.

***

**Live Updating**

Alternativly, If you want to edit information and have a local site update as you work run `grunt dev`. The grunt task does full compilation for production, whereas the `grunt dev` task leaves out a few things for speed:

- Compression of images.
- Minification of html.
- Creating the presskit zip file.
- Autoprefixing css.
- Minification of css.

If you want to get livereloading while looking at the fully compiled site run `grunt prod`, it'll be pretty slow though, since it rezips and everything on any change. 

If you want to do something else then you should take a look at Gruntfile.js.