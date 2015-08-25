# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# 9.times do |n|
#   name  = Faker::Name.name
#   email = "user-#{n+1}@gmail.com"
#   password = "pro"
#   User.create!(
#               email: email,
#               password:              password,)
# end

10.times do |n|
  Propertie.create!(
  label: "House-#{n+1}",
  address: "Address #{n + 1}",
  latitude: "-37.8131869",
  longitude: "144.9629796",
  # type: "",
  size: "3500")
end