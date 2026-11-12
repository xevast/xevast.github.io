#!/usr/bin/env python3
"""Lists every samples/<page> folder, which of the 5 slots are filled, and warns about problems."""
import os,re
ROOT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','samples')
OK=('.jpg','.jpeg','.png','.webp','.pdf')
tot=0
for d in sorted(os.listdir(ROOT)):
    p=os.path.join(ROOT,d)
    if not os.path.isdir(p): continue
    files=[f for f in os.listdir(p) if f!='README.txt']
    slots={}
    warn=[]
    for f in sorted(files):
        m=re.fullmatch(r'([1-9][0-9]*)(\.[A-Za-z0-9]+)',f)
        if not m: warn.append('ignored (name must be 1..5): '+f); continue
        n=int(m.group(1)); ext=m.group(2).lower()
        if ext not in OK: warn.append('unsupported type: '+f); continue
        if n>5: warn.append('slot above 5 is not shown: '+f); continue
        if n in slots: warn.append('two files for slot %d: %s and %s'%(n,slots[n],f)); continue
        slots[n]=f
        mb=os.path.getsize(os.path.join(p,f))/1048576
        if mb>1.5: warn.append('large file (%.1f MB), compress it: %s'%(mb,f))
    tot+=len(slots)
    print('%-34s %s  %d/5'%(d,''.join(str(i) if i in slots else '.' for i in range(1,6)),len(slots)))
    for w in warn: print('    !',w)
print('\nTotal samples filled:',tot)
