#!/bin/sh
gulp
aws s3 sync dist s3://www.cleardata.be --exclude ".git/*" --delete