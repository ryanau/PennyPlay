# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150904061339) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bets", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "details", force: :cascade do |t|
    t.integer  "winner_id",        default: 0
    t.integer  "loser_id",         default: 0
    t.integer  "entry_id"
    t.boolean  "approved",         default: false
    t.integer  "approved_user_id", default: 0
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
  end

  create_table "entries", force: :cascade do |t|
    t.integer  "bet_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "uid"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "token"
    t.string   "pic"
    t.string   "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users_bets", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "bet_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
