$(function () {
	// body...
	function Deck (){
		this.cardsAttr = function (){
			var cards = [];
			for (var i = 1; i < 53; i++) {
				cards.push(i);
			};
			return cards;
		};

		this.showCards = function () {
			$("#dealer_cards").children('img').remove();
			$("#player_cards").children('img').remove();
			var cards = this.cardsAttr();
			for (var i=0; i< cards.length; i++) {
				$('#dealer_cards').append("<img src='images/" +cards[i]+".png'"+"id='dealder_card_" + cards[i]+"'>");
			}
		};

		this.shuffleCards = function () {
			$('#dealer_cards').empty();
			$("#player_cards").empty();
			var cards = this.cardsAttr();
			var j = 0;
			var temp;
			for (var i=cards.length-1; i> 0 ; i--) {
				j = Math.floor(Math.random() *(i+1));
				temp = cards[i];
				cards[i] = cards[j];
				cards[j] = temp;
				$('#dealer_cards').append("<img id='dealder_card_" + cards[i] + "' src = 'images/" + cards[i] + ".png ' >");
			};

		};

		this.dealFirstCard = function() {
			var first = $('#dealer_cards').children('img').first();
			first.clone().addClass('play_card').appendTo('#player_cards');
			first.remove();
			return this;
		};

		this.dealRandomCard = function() {
			var num = $('#dealer_cards').children('img').length;
			console.log(num);
			var random = $('#dealer_cards').children('img').eq(Math.floor(Math.random() * (num+1)));
			random.clone().addClass('play_card').appendTo('#player_cards');
			console.log(random);
			random.remove();
			return this;
		}
	};

	function Player () {
		this.newPlayer = function () {
			var player = prompt("What is your name");
			$('#name').empty();
			$('#name').append(player);
			$('#dealer_cards').empty();
			$('#player_cards').empty();
		};

		this.discardCard = function (imgID) {
			$(imgID).removeClass('play_card');
			$(imgID).clone().appendTo('#dealer_cards');
			$(imgID).remove();
			console.log(imgID);
			console.log($(imgID));
			return this;
		}
	};

	var DeckCards = new Deck();
	$('#reset-deck').on('click', function(e){
		e.preventDefault();
		DeckCards.showCards();
	});

	$('#shuffle-deck').on('click', function(e){
		e.preventDefault();
		DeckCards.shuffleCards();
	});

	$(document).on('click','#deal-first-card',function(e){
		e.preventDefault();
		DeckCards.dealFirstCard();
	});

	$(document).on('click','#deal-random-card',function(e){
		e.preventDefault();
		DeckCards.dealRandomCard();
	});

	var player = new Player();
	$('#new_player').on('click', function(e){
		e.preventDefault();
		player.newPlayer();
		DeckCards.showCards();
	});

	$(document).on('click', '.play_card', function(e){
		e.preventDefault();
		player.discardCard("#" + $(this).attr('id'));
	})



});