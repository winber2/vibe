# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170522173544) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.integer  "author_id",  null: false
    t.integer  "song_id",    null: false
    t.string   "body",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "favorites", force: :cascade do |t|
    t.integer  "favoritable_id",   null: false
    t.string   "favoritable_type", null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.integer  "user_id",          null: false
    t.index ["favoritable_type", "favoritable_id"], name: "index_favorites_on_favoritable_type_and_favoritable_id", unique: true, using: :btree
  end

  create_table "songs", force: :cascade do |t|
    t.string   "title",        null: false
    t.date     "release_date"
    t.string   "genre",        null: false
    t.string   "album"
    t.string   "image_url",    null: false
    t.string   "track_url",    null: false
    t.integer  "author_id",    null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.text     "description"
    t.index ["author_id"], name: "index_songs_on_author_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",                                                                                                            null: false
    t.string   "password_digest",                                                                                                     null: false
    t.string   "session_token",                                                                                                       null: false
    t.string   "profile_image_url", default: "https://res.cloudinary.com/winber1/image/upload/v1495410946/defaultProfile_c7fuwg.png"
    t.datetime "created_at",                                                                                                          null: false
    t.datetime "updated_at",                                                                                                          null: false
    t.string   "header_image_url"
    t.text     "description"
    t.index ["session_token"], name: "index_users_on_session_token", using: :btree
    t.index ["username"], name: "index_users_on_username", using: :btree
  end

end
