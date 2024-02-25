"""committee.py

Utility script to take the committee.txt file with all committee members and
then create a fragment of the committee.html page. Writes to stdout.

The results of this should be inserted into the committee.html page and replace
the <dif> tag and its contents.

"""


print('<div id="contents">\n')
print("<h1>Committees</h1>\n")
print("</p>\n")

started = False
for line in open("committee.txt"):
    line = line.strip()
    if not line:
        # skip empties
        continue
    if line.startswith("==="):
        # the line following a header
        continue
    if line.find("(") > -1:
        # these are lines like "Adam Meyers (New York University)"
        started = True
        person, affiliation = line.split("(")
        person = person.strip()
        affiliation = affiliation.strip()[:-1]
        print("<tr>")
        print('  <td class="p_name">%s</td>' % person)
        print('  <td class="p_affiliation">%s</td>' % affiliation)
        print("</tr>")
    elif line.startswith('*'):
        # for program committee members without organization
        started = True
        person = line.strip()
        print("<tr>")
        print('  <td class="p_name">%s</td>' % person)
        print("</tr>")
    else:
        # these are lines like "Workshop Chairs"
        if started:
            print("</table>\n")
            print("</p>\n")
        print("\n<h2>%s</h2>\n" % line)
        print("<p>\n")
        print('<table class="committee">')

print("</table>\n")
print("</p>\n")
print("</div>\n")
