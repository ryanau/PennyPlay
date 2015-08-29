user_1 = User.create(email: "test@test.com", password: "1234")
user_1.bets.create(name: "flash V4s")

user_2 = User.create(email: "test1@test.com", password: "1234")
UsersBet.create(user_id: user_2.id, bet_id: user_1.bets.first.id)

user_3 = User.create(email: "test2@test.com", password: "1234")
UsersBet.create(user_id: user_3.id, bet_id: user_1.bets.first.id)

Transaction.create(user_id: )
