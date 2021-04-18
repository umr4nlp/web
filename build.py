#!/usr/bin/env python3

"""build.py
Script to take the building blocks of the LAW XI web site and create the full
html site. Run it from this directory by simply doing the following:
    $ python3 build.py SITE_DIRECTORY
This builds the website in SITE_DIRECTORY, if that directory already exists the
script will exit with an error and do nothing.
The web site is built from several documents:
1- Documents in the pages directory as defined in the PAGES variable below. The
   documents in pages/ are regular html pages except that they can use an
   #INCLUDE# directive which this scripts uses to include files from the include
   directory. This is a straight copy, unless the included file happens to be
   include/navigation.html, in which case the name of the file that contains the
   #INCLUDE# directive is used to add a class to one of the elements in the
   navigation bar. For example, if the including file is index.html, then in the
   navigation file the line
      <li><a href="index.html">Home</a></li>
   will be replaced with
      <li class="active"><a href="index.html">Home</a></li>
   This class is used by the style sheet to highlight in the navigation bar the
   page we are on.
   Note that if the PAGES variable is changed you may also want to change the
   navigation code in include/navigation.html.
2- The stylesheets as defined by the SYLESHEETS variable below. Typically, this
   will not need to be changed as long as all style changes are made to the one
   existing stylesheet.
3- The images as defined by the IMAGES variable below. Images, like all other
   files, are put in the SITE_DIRECTORY folder. There is no further directory
   structure in the site.
"""

# TODO switch to pathlib?
import os
import shutil


# The following three set (1) the pages that are included in the build process,
# (2) the images to be included and (3) the style sheets to be included. Edit
# these as needed.

PAGES = ["cfp", "committee", "index", "accepted", "program", "invited",
        "dinner", "virtual-conference-information"]
IMAGES = [os.path.join("images", "logo", "LAW14_Logo.svg")]
STYLESHEETS = [os.path.join("css", "law2020.css")]


def include_file(infile, include_file, outfile):
    if include_file.find("navigation.html") > -1:
        short_name = infile.split(os.sep)[1]
        with open(include_file, encoding="utf-8") as ifile:
            for line in ifile:
                if line.find(short_name) > -1:
                    line = line.replace("<li>", '<li class="active">')
                outfile.write(line)
    else:
        with open(include_file, encoding="utf-8") as ifile:
            for line in ifile:
                outfile.write(line)


if __name__ == "__main__":

    site = os.sys.argv[1]

    # delete old files
    if os.path.exists(site):
        shutil.rmtree(site)

    os.makedirs(site)

    for page in PAGES:
        fname_in = os.path.join("pages", "%s.html" % page)
        fname_out = os.path.join(site, "%s.html" % page)
        print(os.path.abspath(fname_out))
        with open(fname_in, encoding="utf-8") as infile:
            with open(fname_out, "w", encoding="utf-8") as outfile:
                for line in infile:
                    if line.lstrip().startswith("#INCLUDE# "):
                        file_to_import = os.path.join(
                            "include", line.split()[1].strip()
                        )
                        include_file(fname_in, file_to_import, outfile)
                    else:
                        outfile.write(line)

    for stylesheet in STYLESHEETS:
        target = os.path.join(site, os.path.basename(stylesheet))
        print(os.path.abspath(target))
        shutil.copyfile(stylesheet, target)

    for image in IMAGES:
        target = os.path.join(site, os.path.basename(image))
        print(os.path.abspath(target))
        shutil.copyfile(image, target)