# -*- coding: utf-8 -*-
"""
pages.py
~~~~~~

:copyright: (c) 2013 by Bombolone
""" 
# Imports outside Bombolone
from flask import Blueprint, request, g, render_template, url_for, redirect
from bson import ObjectId
from pymongo.errors import InvalidId, PyMongoError

# Imports from Bombolone's Core
from core.utils import jsonify, ensure_objectid
from core.languages import Languages
from core.validators import CheckValue
from core.admin.hash_table import HashTable, hash_table_list, hash_table_get

# Imports inside Bombolone
from config import LIST_LANGUAGES
from decorators import check_token, check_token_post, check_rank, get_hash, jsonp

pages_api = Blueprint('pages_api', __name__)

languages_object = Languages()
check = CheckValue()

@pages_api.route('/api/pages/list.json')
@check_token
@check_rank(20)
@get_hash('pages')
@jsonp
def overview():
    """ List all the documents, each has a name 
    that identifies it, and an hash map. """
    hash_map_list = hash_table_list()
    data = {
        "success": True,
        "hash_map_list": hash_map_list
    }
    return jsonify(data)

@pages_api.route('/api/pages/get.json')
@check_token
@check_rank(20)
@get_hash('pages')
@jsonp
def get():
    """ """
    _id = request.args.get("_id", None)
    hash_map = hash_table_get(_id)
    data = {
        "success": True,
        "hash_map": hash_map
    }
    return jsonify(data)

@pages_api.route('/api/pages/new.json', methods=['POST'])
@check_token_post
@check_rank(10)
@get_hash('pages')
def new():
    """ Create a new document within the hash table. """
    language_name = languages_object.get_languages(5)
    params = request.json

    hash_object = HashTable(params=params)
    hash_object.new()

    data = {
        "success": hash_object.success,
        "message": hash_object.message,
        "hash_map": hash_object.hash_map
    }
    return jsonify(data)

@pages_api.route('/api/pages/remove.json')
@check_token
@check_rank(10)  
@jsonp
def remove():
    """ This method removes an hash map.
    :param _id: MongoDB ObjectId """
    _id = request.args.get("_id", None)
    hash_object = HashTable(_id=_id)

    success = False
    if _id:
        success = hash_object.remove()

    data = {
        "success": success
    }
    return jsonify(data) 

@pages_api.route('/api/pages/update.json', methods=['POST'])
@check_token_post
@check_rank(20)
@get_hash('pages')
def update():
    """ """
    language_name = languages_object.get_languages(5)
    params = request.json

    success = False
    message = ""
    hash_map = {}

    if "_id" in params:
        hash_object = HashTable(params=params, _id=params["_id"])
        hash_object.update()

        success = hash_object.success
        message = hash_object.message
        hash_map = hash_object.hash_map

    data = {
        "success": success,
        "message": message,
        "hash_map": hash_map
    }
    return jsonify(data)
  