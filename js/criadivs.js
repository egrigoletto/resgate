//sons do jogo

var somDisparo = document.getElementById("somDisparo");
var somExplosao = document.getElementById("somExplosao");
var musica = document.getElementById("musicaFundo");
var somGameOver = document.getElementById("somGameOver");
var somPerdido = document.getElementById("somPerdido");
var somResgate = document.getElementById("somResgate");

function start()

{
//quando o jogo inicia eu escondo a div com hide e incluo na div de fundo os elementos referentes ao jgador e aos inimigos
$('#inicio').hide();
$('#fundoGame').append("<div id='jogador' class='anima1'></div>");
$('#fundoGame').append("<div id='inimigo1' class='anima2'></div>");
$('#fundoGame').append("<div id='inimigo2'></div>");
$('#fundoGame').append("<div id='amigo' class='anima3'></div>");
$('#fundoGame').append("<div id='placar'></div>");
$('#fundoGame').append("<div id='energia'></div>");

//principais variáveis do jogo, a partir daqui se criam os loops, eles ficam sem parar coletando as teclas apertadas, detectando as colisões e movimentando os inimigos

var jogo = {}
var velocidade = 5; //velocidade do jogo
var posicaoY = parseInt(Math.random() * 335);//valor da movimentação aleatória do inimigo pela tela 
var podeAtirar = true;
var fimDeJogo = false;
var pontos = 0;
var salvos = 0;
var perdidos = 0;
var energiaAtual =3;



jogo.timer = setInterval(loop,30);



//detecção de teclas apertadas

var TECLA = {W:87, S:83, D:68} //array de teclas de movimentação

jogo.pressionou = []; //array sem tamanho que verifica se a tecla foi apertada

$(document).keydown(function(e){

jogo.pressionou[e.which] = true;
});

$(document).keyup(function(e){

jogo.pressionou[e.which] = false;
});

//loop 

function loop()
{
//cria um evento listener para a música, se ela acabou, ela reseta
 musica.addEventListener
 ("ended",
   function()
   {
    musica.currentTime= 0;
		musica.play()
   }, false
  );	
	musica.play();
	movefundo();
 	movejogador();
 	moveinimigo1();
 	moveinimigo2();
 	moveamigo();
 	colisao();
 	placar();
 	energia();
/* //a cada 1000 pontos a velocidade aumenta e o jogo se torna mais difícil - opcional
 if (mod(pontos/1000))
  {
	velocidade+=0.5;
  }*/

 //fim do loop
 }
function movefundo()
{
 esquerda = parseInt($("#fundoGame").css("background-position"));
 $("#fundoGame").css("background-position",esquerda-1);
 
 }
function movejogador() //move a div jogador para a direção apontada(cima ou baixo), baseado na tecla apertada
{
	//W vai para cima
 if (jogo.pressionou[TECLA.W])
 {
   var topo = parseInt($("#jogador").css("top"));
    if (topo <= 9)
	{
	  $("#jogador").css("top",topo-0);
	}
	else 
	{
      $("#jogador").css("top",topo-10);
	}
 }
 
 if (jogo.pressionou[TECLA.S])
 {
   var topo = parseInt($("#jogador").css("top"));
   if (topo >= 434)
   {
    $("#jogador").css("top", topo+0);
   }
   else
   {
    $("#jogador").css("top", topo+10);
	}
 }
 
 //ativa a função de tiro, se a tecla D for apertada, atira
 
 if (jogo.pressionou[TECLA.D])
 {
   //chamada da função disparo
   disparo(); 
 }
 //fim da função movejogador
} 
 
 function moveinimigo1()
 {
  posicaoX = parseInt($("#inimigo1").css("left"));
  $("#inimigo1").css("left",posicaoX-velocidade);
  $("#inimigo1").css("top", posicaoY);
  
  if (posicaoX <= 0) //se eu me movi até meu limite de tela a esquerda, volto para 694 de left que é a posição inicial 
  {
    posicaoY =  parseInt(Math.random * 334);
	$("#inimigo1").css("top", posicaoY);
	$("#inimigo1").css("left", 694);
  }
  //fim da funcão moveinimigo1
 } 

 function moveinimigo2()
 {
   posicaoX = parseInt($("#inimigo2").css("left"));
   $("#inimigo2").css("left",posicaoX - 3);
   if (posicaoX <= 0)
   {
    $("#inimigo2").css("left", 775); 
   }
   //fim da função moveinimigo2
 }
 
 function moveamigo()
 {
   posicaoX = parseInt($("#amigo").css("left"));
   $("#amigo").css("left",posicaoX + 1);
   if (posicaoX >=  906)
   {
     $("#amigo").css("left",0);
   }
  //fim da função moveamigo
 }
  
  function disparo()
 { 
 if (podeAtirar == true)
  {
   
   podeAtirar = false;
   somDisparo.play();
   topo = parseInt($("#jogador").css("top"));
   posicaoX = parseInt($("#jogador").css("left"));
   tiroX = posicaoX + 190;
   topoTiro = topo + 37;
   $("#fundoGame").append("<div id='disparo'></div>");
   $("#disparo").css("top",topoTiro);
	 $("#disparo").css("left",tiroX);
	 //determina meu intervalo de deslocamento do tiro, tiros mais rápidos podem ter checagem de posição menor
   var tempoDisparo = window.setInterval(executaDisparo, 20);
	}
	

   function executaDisparo()
   {
    posicaoX = parseInt($("#disparo").css("left"));
		$("#disparo").css("left",posicaoX + 30);
	  
	  if (posicaoX >= 890)
	  {
	    window.clearInterval(tempoDisparo);
		tempoDisparo = null;
		$("#disparo").remove();
		podeAtirar = true;
	  }
	//fim da função executaDisparo  
   } 
  //fim da função disparo
 }
	
 //ajusta as hitboxes(blocos de colisão) do jogador, disparo e tiro
  function colisao()
  {
		//cria hitboxes nas divs
    var colisao1 = ($("#jogador").collision($("#inimigo1")));
		var colisao2 = ($("#jogador").collision($("#inimigo2")));
		var colisao3 = ($("#disparo").collision($("#inimigo1")));
		var colisao4 = ($("#disparo").collision($("#inimigo2")))
		var colisao5 = ($("#jogador").collision($("#amigo")));
		var colisao6 = ($("#explosao1").collision($("#amigo")));
		var colisao7 = ($("#inimigo2").collision($("#amigo")));
		// caso se colida com um helicópterio, dá o som de explosão e o helicóptero inimigo é resetado de posição 
		if (colisao1.length > 0)
		{
	  	energiaAtual--;
	  	inimigo1X = parseInt($("#inimigo1").css("left"));
	  	inimigo1Y = parseInt($("#inimigo1").css("top"));
	  	explosao1(inimigo1X,inimigo1Y);
	  	posicaoY = parseInt(Math.random() * 334);
	  	$("#inimigo1").css("left",694);
	  	$("#inimigo1").css("top",posicaoY);
	 
		}
		//caso se colida com um caminhão, o som de explosão é ativado e a poisção do inimigo resetada
		//colisões retiram energia
		if (colisao2.length > 0)
		{
	  	energiaAtual--;
	  	inimigo2X = parseInt($("#inimigo2").css("left"));
	  	inimigo2Y = parseInt($("#inimigo2").css("top"));
	  	explosao2(inimigo2X, inimigo2Y);
	  //$("#inimigo2").css("left",775); reseta a posição do inimigo2 e funciona
	  	$("#inimigo2").remove();
	  	reposicionaInimigo2();
	}
	//se eu atirei em algum helicótero, ganho pontos e executo o mesmo procedimento de colisão
	//a posição do tiro é resetada, para se deslocar conforme a função de disparo
	if (colisao3.length > 0)
	{
     inimigo1X = parseInt($("#inimigo1").css("left"));
     inimigo1Y = parseInt($("#inimigo1").css("top"));
     explosao1(inimigo1X, inimigo1Y);
     pontos+=100;	 
	 $("#disparo").css("left",990);
	 posicaoY = parseInt(Math.random() * 334);
	 $("#inimigo1").css("left",710);
	 $("#inimigo1").css("top",posicaoY);
	}
	//se eu atirei em algum caminhão, ganho pontos e executo o mesmo procedimento de colisão
	//a posição do tiro é resetada, para se deslocar conforme a função de disparo
	if (colisao4.length > 0)
	{
	  inimigo2X = parseInt($("#inimigo2").css("left"));
	  inimigo2Y = parseInt($("#inimigo2").css("top"));
	  explosao2(inimigo2X, inimigo2Y);
	  pontos+=50;
	  $("#disparo").css("left",990);
	  $("#inimigo2").remove();
	  reposicionaInimigo2();
	
	}
	// se eu peguei um refém, ele é removido e sua posição é resetada, pode-se dar pontos para o ato também
	if (colisao5.length > 0)
	{
	  somResgate.play();
	  reposicionaAmigo();
	  $("#amigo").remove();
		salvos+=1;
		//pontos+= 30
	}
	//se um refém morre, eu dou uma "penalidade" se 10 reféns forem perdidos, fim de jogo
	//amigos, assim como inimigos são reposicionados ao serem atingidos
	if (colisao6.length > 0)
	{
	 amigoX = parseInt($("#amigo").css("left"));
	 amigoY = parseInt($("#amigo").css("top"));
	 explosao3(amigoX,amigoY);
	 $("#amigo").remove();
	 perdidos+=1;
	 if (perdidos >= 10)
	 {
	  gameOver();
	 }
	 reposicionaAmigo();
	}
	//caminhão atropelou um refém, que triste...
	if (colisao7.length > 0)
	{
	 amigoX = parseInt($("#amigo").css("left"));
	 amigoY = parseInt($("#amigo").css("top"));
	 explosao3(amigoX,amigoY);
	 $("#amigo").remove();
	 perdidos+=1;
	 reposicionaAmigo();
	}
    //fim da função colisão
  }
	
	//aqui a coisa é simples, a cada colisão a função de explosão é chamada, ela cria o efeito com a imagem que dura um segundo e some com "hide"
  function explosao1(inimigo1X,inimigo1Y)
  {
    somExplosao.play();
	$("#fundoGame").append("<div id='explosao1'></div>");
	$("#explosao1").css("background-image","url(imgs/explosao.png)");
	var div = $("#explosao1");
	div.css("top",inimigo1Y);
	div.css("left",inimigo1X);
  //dá efeito de "fade out"	
	div.animate({width:200, opacity: 0}, "slow");
	var tempoExplosao = window.setInterval(removeExplosao,1000);
    function removeExplosao()
    {
      div.remove();
      window.clearInterval(tempoExplosao);
      tempoExplosao = null;	  
	}
  //fim da função explosão1	
  }
  
  function explosao2(inimigo2X, inimigo2Y)
  {
    somExplosao.play();
	$("#fundoGame").append("<div id='explosao1'></div>");
	$("#explosao1").css("background-image","url(imgs/explosao.png)");
	var div = $("#explosao1");
	div.css("left",inimigo2X);
	div.css("top",inimigo2Y);
	div.animate({width:200, opacity: 0}, "slow");
	var tempoExplosao = window.setInterval(removeExplosao,1000);
    function removeExplosao()
    {
      div.remove();
      window.clearInterval(tempoExplosao);
      tempoExplosao = null;	  
	}
   //fim da função explosao2
  }
  function explosao3(amigoX,amigoY)
  {
    somPerdido.play();
	$("#fundoGame").append("<div id='explosao3' class='anima4'></div>")
    $("#explosao3").css("left", amigoX);
	$("#explosao3").css("top", amigoY);
	var tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);
	function resetaExplosao3()
	{
	 $("#explosao3").remove();
	 window.clearInterval(tempoExplosao3);
	 tempoExplosao3 = null;
	}
  //fim da função explosao3
  }
	
	//recoloca caminhões na tela
  function reposicionaInimigo2()
  {
    var tempoColisao4 = window.setInterval(reposiciona4,5000);
	function reposiciona4()
	{
	  window.clearInterval(tempoColisao4);
	  tempoColisao4 = null;
	  if (fimDeJogo == false)
	  {
	    $(fundoGame).append("<div id='inimigo2'></div>");
	  }
	}
  //fim da função reposicionaInimigo2
  }
	
	//recoloca amigos(refém) na tela
  function reposicionaAmigo()
  {
  var tempoAmigo = window.setInterval(reposiciona5, 6000);
  function reposiciona5()
  {
    window.clearInterval(tempoAmigo);
    tempoAmigo = null;
    if (fimDeJogo == false)
	  {
	    $('#fundoGame').append("<div id='amigo' class='anima3'></div>");
	  }
  }
    //fim da função reposicionaAmigo
  }
  
  function placar() 
  {
   $("#placar").html("<h2>&nbsp;Pontos: "+pontos+" Salvos: "+salvos+" Perdidos: "+perdidos+"</h2>");
   //fim da função placar
  }
  //barra de energia
  function energia()
  {
    if(energiaAtual == 3)
	{
	  ($("#energia").css("background-image", "url(./imgs/energia3.png)"));
 	  }
	if(energiaAtual == 2)
	   {
	   ($("#energia").css("background-image", "url(./imgs/energia2.png)"));
 	  }
	if(energiaAtual == 1)
	   {
	    ($("#energia").css("background-image", "url(./imgs/energia1.png)"));
 	   }
	if(energiaAtual == 0)
	 {
	  ($("#energia").css("background-image", "url(./imgs/energia0.png)"));
	  //you died, pegou essa referência?
	  gameOver();
 	  } 
   //fim da função energia()
  }
  
  function gameOver()
  {
    fimDeJogo = true;
	musica.pause();
	somGameOver.play();
	
	window.clearInterval(jogo.timer);
	jogo.timer = null; 
	
	$('#jogador').remove();
	$('#inimigo1').remove();
	$('#inimigo2').remove();
	$('#amigo').remove();
	$('#placar').remove();
	$('#energia').remove();
	$('#fundoGame').append("<div id='fim'></div>");
	$("#fim").html("<h1>Você Morreu</h1><p>Sua pontuação foi: "+pontos+" pontos</p><div id='reinicia' onclick = reiniciaJogo()><h3>Clique aqui para jogar novamente</h3></div>");
	//fim da função gameOver
  } 
}
function reiniciaJogo()
  {
    somGameOver.pause();
	$("#fim").remove();
	start();
	//fim da função reiniciaJogo
  }
