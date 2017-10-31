#!/bin/sh
gulp
aws s3 sync dist s3://test.cleardata.be --exclude ".git/*" --delete