#!/bin/sh

command -v konfig >/dev/null 2>&1 || {
  echo >&2 "konfig-manager is not installed. Installing it...";
  npm i -g konfig-manager
}

konfig dump --file ./konfig.json
