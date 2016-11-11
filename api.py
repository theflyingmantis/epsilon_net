import subprocess
from subprocess import *

list1=["./a.out","0.123","1","2","4","5","6","7","1","3","2","3","2","5"]

st= check_output(list1)
print st
