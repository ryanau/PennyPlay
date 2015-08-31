user_1 = User.create(email: "test@test.com", password: "1234")
user_1.bets.create(name: "flash V4s")
user_1.bets.create(name: "eat all donuts")

user_2 = User.create(email: "test1@test.com", password: "1234")
UsersBet.create(user_id: user_2.id, bet_id: user_1.bets.first.id)

user_3 = User.create(email: "test2@test.com", password: "1234")
UsersBet.create(user_id: user_3.id, bet_id: user_1.bets.first.id)
UsersBet.create(user_id: user_3.id, bet_id: user_1.bets[1].id)

Transaction.create(winner_id: 1, loser_id: 2, bet_id: 1)
Transaction.create(winner_id: 2, loser_id: 1, bet_id: 1)
Transaction.create(winner_id: 1, loser_id: 3, bet_id: 1)
