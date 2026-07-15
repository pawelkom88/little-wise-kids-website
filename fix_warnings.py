import os
import re

def fix_validation(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Match rule.required().max(X).warning(Y)
    # Be careful of multiline matches.
    
    # We'll use a simpler regex approach for inline cases:
    # rule.required().max(N).warning("MSG")
    # should become
    # [rule.required(), rule.max(N).warning("MSG")]
    
    pattern = r'rule\.required\(\)\.max\((\d+)\)\.warning\(([^)]+)\)'
    
    def repl(m):
        max_val = m.group(1)
        warning_msg = m.group(2)
        # We can't know the exact .error() message unless we deduce it, so we'll just do:
        return f"[rule.required(), rule.max({max_val}).warning({warning_msg})]"
        
    new_content = re.sub(pattern, repl, content)
    
    # Also handle cases where it spans multiple lines
    # For now let's just do a manual replacement if needed, or see if this catches most.
    
    with open(filepath, 'w') as f:
        f.write(new_content)

directory = 'src/sanity/schemaTypes/singletons'
for filename in os.listdir(directory):
    if filename.endswith('.ts'):
        fix_validation(os.path.join(directory, filename))

