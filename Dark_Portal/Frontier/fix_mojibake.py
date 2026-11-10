import io, os, sys

P = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Frontier.template.html")
s = io.open(P, encoding="utf-8").read()

PAIRS = [
    ("\u00e2\u20ac\u00a6", "\u2026"),   # a-euro-ellipsis  -> horizontal ellipsis
    ("\u00e2\u20ac\u201d", "\u2014"),   # -> em dash
    ("\u00e2\u20ac\u201c", "\u201c"),
    ("\u00e2\u20ac\u2122", "\u2019"),
    ("\u00e2\u20ac\u02dc", "\u2018"),
    ("\u00c2\u00b7", "\u00b7"),
    ("\u00c2\u00b0", "\u00b0"),
    ("\u00c3\u00a2", "\u00e2"),
]
total = 0
for bad, good in PAIRS:
    n = s.count(bad)
    if n:
        s = s.replace(bad, good)
        total += n
        print("replaced", repr(bad), "->", repr(good), n)

if total:
    io.open(P, "w", encoding="utf-8", newline="").write(s)
print("done, replacements:", total)
