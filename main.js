const formulario = document.getElementById("formulario");//resgatando o id do form para adicionarmos os nossos respectivos eventos
let linhas = '';//definindo a variável linha que de ínicio será vazia, mas na função de adicionar contato essa linha vai ser a linha do contato
const nomesContatos = [];//array responsável por captar a quantidade de contatos
const telefones = [];//array que pega os numeros de telefone adicionados


formulario.addEventListener('submit', function(evento){//vamos adicionar um evento para quando o botão de submit for acionado, fazer suas respectivas funções
    evento.preventDefault();//vamos evitar a ação padrão do navegador de reiniciar no momento que for apertado o botão de cadastro
    addContatoTabela();//usando a função para quando for acionado o botão, adicionar o contato a tabela, nessa função são feitas vária validações
    atualizandoQtdContatos();//usando a função que atualiza a quantidade de contatos sempre que houver uma alteração na tabela
    })

    function addContatoTabela(){
//---------------DECLARANDO AS CONTANTES, TANTO PARA CAPTAR OS CAMPOS, COMO PARA DEFINIR A MENSAGEM QUE SERÁ EXIBIDA ---------------------//
        const inputNome = document.getElementById('input-nome');
        const inputTelefone = document.getElementById('input-telefone');
        const valorTelefone = Number.parseInt(inputTelefone.value);
        const mensagemErro = `<b>Erro! Contato já inserido!<b>`;
        const containerMensagemErro = document.getElementById('error-message');
        const containerMensagemNumeroInvalido = document.getElementById('invalid-message');
        const mensagemInvalido = `<b>Número inválido! Digite Novamente!</b>`;
//----------------------------------------------------------------------------------------------------------------------------------------//
        const qtdDigitos = [];//Declarando um array onde ele representa o conjunto para abrigar a quantidade de dígitos que forem inseridos pelo usuário no input
        const pegaCadaDigito = inputTelefone.value.split('');//usando o método split onde ele vai separar cada dígito colocado e inserir-lo no array
        for(let i = 0; i < pegaCadaDigito.length; i++){//vamos agora percorrer o array depois de ter feito o split, pegar cada elemento tranformá-lo em inteiro e colocar no array qtdDigitos
            const digitoInteiro = Number.parseInt(pegaCadaDigito[i]);
            qtdDigitos.push(digitoInteiro);
        }

        if(qtdDigitos.length<10 || qtdDigitos.length>11){//fazendo a primeira validação caso a qtd de dígitos seja inválida, tomando em consideração com o DDD e com o 9 que geralmente usa
            containerMensagemNumeroInvalido.innerHTML= mensagemInvalido;
            containerMensagemNumeroInvalido.style.display = 'block'; //caso isso venha a acontecer, a mensagem de número inválido irá aparecer tendo seu display que antes era none agora será block.
        }

        if(qtdDigitos.length>=10 && qtdDigitos.length<=11){//se a quantidade de dígitos for correta irá fazer outra validação
            if(nomesContatos.includes(inputNome.value) && telefones.includes(valorTelefone)){//caso o nome do contato e o seu respectivo número já estiverem nos arrays, inserir mensagem de erro
                containerMensagemErro.innerHTML = mensagemErro;
                containerMensagemErro.style.display = 'block';
            } else{//caso seja válido, inserir na tabela
                const linha = `<tr><td>${inputNome.value}</td><td>${valorTelefone}</td></tr>`;//definindo a constante que representa a escrita do código html
                linhas = linhas + linha;//declarando a variável que estava vazia, agr concatena com a variavel que representa o escopo do codigo html
                nomesContatos.push(inputNome.value);
                telefones.push(valorTelefone);//insiro os nomes e os telefones nos seus devidos arrays
                const corpoTabela = document.getElementById('tabela');//declaro a constante que captura o elemento do corpo da tabela onde será inserido a respectiva linha
                corpoTabela.innerHTML = linhas;//insiro no corpo da tabela a variável que representa o respectivo contato
            }
        }

        inputNome.value = '';//declarando que os inputs serão vazios após efetuar a operação de se apertar o botão 
        inputTelefone.value = '';

        formulario.addEventListener('keyup',function(){//adicionando um evento ao momento em que seja teclado os inputs do formulário, os containers de mensagens de erro desaparecam por estar representando uma nova tentativa de inserção de dados. 
            containerMensagemErro.style.display='none';
            containerMensagemNumeroInvalido.style.display='none'
        })
    }

    function atualizandoQtdContatos(){
        const qtdContatos = document.getElementById('qtd_contatos');//capturando o elemento do rodapé da tabela onde se localiza o campo que mostra a quantidade de contatos
        qtdContatos.innerHTML = `${nomesContatos.length}`;//inserindo o tamanho do array dos nomesContatos que representa diretamente a quantidade de contatos existentes.
    }

