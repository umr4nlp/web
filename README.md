# This website holds the website for the Uniform Meaning Representation (UMR) project


$ git checkout main
# ...make, commit, and push changes...
$ python3 build.py deploy

#uncommited directory/file in 'deploy' is visible from all branches

$ git checkout brandeis

$ mv deploy/* .

$ rmdir deploy

$ git commit -a -m "deploy changes"

$ git push
