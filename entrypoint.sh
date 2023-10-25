`
#!/bin/sh -l

curl -s https://awake-api.herokuapp.com/awake/$1 | grep -q "true"
if [ $? -eq 0 ]; then
echo "$1 is awake!"
exit 0
else
echo "$1 is asleep :("
exit 1
fi
`
