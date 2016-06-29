with open('main.html', 'r') as file_input:
    contents = file_input.read()
import os
src = os.listdir('src')
contents = contents.replace("<!--SCRIPTS GO HERE-->", "\n".join(map(lambda name: "<script src='src/" + name + "'></script>", src)))
open('index.html', 'w').write(contents)
