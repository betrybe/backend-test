# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

(1..4).each {|id| 5.times {BlogPost.create!(title: Faker::Lorem.words(number: 4), content:Faker::Lorem.words(number: 10), user_id: id)}}