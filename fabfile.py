#!/usr/bin/env python
# vim:fileencoding=utf-8


from fabric.api import *

PROJECT_ROOT = '/home/gremlin/webapps/static/teachbase_editor'
PROJECT_SOURCE = 'git@github.com:artpropeller/teachbase_editor.git'

#noinspection PyRedeclaration
env.hosts = ['gremlin.webfactional.com']
env.user = 'gremlin'

def fu():
    #local('hg push')
    with cd(PROJECT_ROOT):
        run('git pull')

def cl():
    #local('hg push')
    with cd(PROJECT_ROOT):
        run('../env/bin/python manage.py thumbnail clear')
        run('../env/bin/python manage.py thumbnail cleanup')

