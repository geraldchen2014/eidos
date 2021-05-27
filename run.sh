#!/usr/bin/env bash

cp -r /root/eidos/_build/* /usr/share/nginx/html/
nginx -s reload
