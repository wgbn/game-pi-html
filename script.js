var app = (function(){
    
    var Bola = (function () {
        function Bola(_cor, _posicao, _id, _game) {
            this.cor = _cor || 'red';
            this.posicao = _posicao || 0;
            this.game = _game;
            this.id = _id;
            
            this.umaBola = document.createElement('div');
            this.umaBola.setAttribute('class', 'bola');
            this.umaBola.setAttribute('id', 'bola-'+this.id);
            this.umaBola.style.backgroundColor = this.cor;
            this.umaBola.style.top = this.posicao + 'px';
            this.game.appendChild(this.umaBola);
        }
        Bola.prototype.move = function (_step) {
            _step = _step || 5;
            this.posicao += _step;
            this.umaBola.style.top = this.posicao + 'px';
        };
        Bola.prototype.lancar = function () {
            var timer = setInterval(mover, 50);
            var self = this;
            
            function mover(){
                if (self.getPosicao() < (self.game.offsetHeight - 90))
                    self.move(10);
                else 
                    sair();
            }
            
            function sair(){
                clearInterval(timer);
                
                if (app.cor == self.cor)
                    app.marcaPonto();
                else
                    app.gameOver();
                
                self.destroi();
            }
        };
        Bola.prototype.destroi = function () {
            //this.game.removeChild(this);
            document.getElementById('bola-'+this.id).remove();
            //alert('destroi');
            
        };
        Bola.prototype.getPosicao = function () {
            return this.posicao;
        };
        return Bola;
    })();
    
    var Bloco = (function () {
        function Bloco(_cor, _posicao, _top, _game) {
            this.cor = _cor || 'red';
            this.posicao = _posicao || 0;
            this.umBloco = document.createElement('div');
            this.umBloco.setAttribute('class', 'bloco');
            this.umBloco.style.backgroundColor = this.cor;
            this.umBloco.style.left = this.posicao + 'px';
            this.umBloco.style.top = _top + 'px';
            _game.appendChild(this.umBloco);
        }
        Bloco.prototype.move = function (_posicao) {
            this.posicao += _posicao;
            this.umBloco.style.left = this.posicao + 'px';
        };
        Bloco.prototype.getPosicao = function () {
            return this.posicao;
        };
        Bloco.prototype.setCor = function (_cor, _rot) {
            this.cor = _cor;
            this.umBloco.style.backgroundColor = this.cor;
            this.umBloco.style.transform = 'rotate('+_rot+'deg)';
        };
        return Bloco;
    })();
    
    var game = document.querySelector('.game');
    var ponto = document.querySelector('.pontos');
    var over = document.querySelector('.over');
    var _altura_game = game.offsetHeight || 0;
    var _largura_game = game.offsetWidth || 0;
    var _altura_metade_game = _altura_game / 2;
    var _altura_blocos = _altura_game - 70;    
    
    var bolas = [];
    var i = 0;
    app.cor = 'blue';
    var pontos = 0;
    
    game.addEventListener('click', trocaBloco, false);
    
    var lanca = setInterval(lancar, 800);
    var lanca2 = setInterval(lancar, 2500);
    
    var bl1 = new Bloco('blue', (_largura_game - 60) / 2, _altura_blocos, game);
    var bl2 = new Bloco('red', (_largura_game - 60) / 2, _altura_blocos+20, game);
    
    function lancar(){
        bolas.push(new Bola(((new Date().getTime()) % 2) ? 'blue':'red', 0, i, game));
        bolas[i].lancar();
        i++;
        //console.log(bolas.length);
    }
    
    function trocaBloco(e){
        if (app.cor == 'blue')
            app.cor = 'red';
        else
            app.cor = 'blue';
        
        bl1.setCor(app.cor == 'blue' ? 'blue':'red', app.cor == 'blue' ? 180 : -180);
        bl2.setCor(app.cor == 'blue' ? 'red':'blue', app.cor == 'blue' ? 180 : -180);
    }
    
    app.marcaPonto = function(){
        pontos++;
        ponto.innerHTML = pontos;
    };
    
    app.gameOver = function(){
        game.style.display = 'none';
        over.style.display = 'block';
        document.querySelector('.restart').addEventListener('click', function(e){
            e.preventDefault();
            location.reload();
        }, false);
    };
  
});

(function(){
    app();
})();

/*;(function(window, document){
    
    var App = (function(){
        
        var _private = {};
        var _public = {};
        
        _public.init = function(){
            // aqui
            //eval('alert("porra")');
        };
        
        return _public;
        
    })();
    
    window.App = App;
    
})(window, document);
document.addEventListener("DOMContentLoaded", function(e){
    window.App.init();
});*/