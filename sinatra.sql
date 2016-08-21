-- Deve ser inserido no inicio antes de se importar um ficheiro
-- Nao faz verificacao de chaves unicas
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
-- Nao faz verificacao se as chaves estrangeiras existem noutras tabelas
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
-- Comporta-se como uma base de dados "tradicional", dando erro em vez de erros
-- Nao verifica as datas exaustivamente, verifica os dias e os meses 
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `sinatra` ;
CREATE SCHEMA IF NOT EXISTS `sinatra` DEFAULT CHARACTER SET latin1 ;
USE `sinatra` ;

-- -----------------------------------------------------
-- 		        TABELAS 		                      
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Table `sinatra`.`Terapeuta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sinatra`.`Terapeuta`;

CREATE  TABLE IF NOT EXISTS `sinatra`.`Terapeuta` (
    `id` INT NOT NULL AUTO_INCREMENT ,
    `foto` VARCHAR(255) NOT NULL ,
    `nome` VARCHAR(255) NOT NULL ,
    `password` VARCHAR(255) NOT NULL ,
    `enable` TINYINT NOT NULL , 
    PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- Deve ser inserido no final do ficheiro
-- Faz reset as variaveis alteradas no inicio do ficheiro
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Table `sinatra`.`Crianca`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sinatra`.`Crianca` ;

CREATE  TABLE IF NOT EXISTS `sinatra`.`Crianca` (
    `id` INT NOT NULL AUTO_INCREMENT ,
    `foto` VARCHAR(255) NOT NULL ,
    `username` VARCHAR(255) NOT NULL ,
    `nome` VARCHAR(255) NOT NULL ,
    `dataNascimento` DATE NOT NULL ,
    `observacao` VARCHAR(255) NULL ,
    `password` VARCHAR(255) NOT NULL ,
    `enable` TINYINT NOT NULL ,
    `registos` VARCHAR(2000) NULL ,
    PRIMARY KEY (`id`))  
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sinatra`.`Sessao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sinatra`.`Sessao` ;

CREATE  TABLE IF NOT EXISTS `sinatra`.`Sessao` (
    `id` INT NOT NULL AUTO_INCREMENT ,
    `tipoSessao` VARCHAR(2000) NOT NULL ,
    `idTerapeuta` INT NOT NULL ,
    `dataHora` DATETIME NOT NULL ,
    `dataInicio` DATE NOT NULL ,
    `dataFim` DATE NOT NULL ,
    `idCriancas` VARCHAR(2000) NOT NULL ,
    `tipoExercicio` VARCHAR(2000) NOT NULL ,
    `idExercicio` INT NOT NULL ,
    `idCenasPontuacao` VARCHAR(2000) NOT NULL ,
    PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sinatra`.`Historico`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sinatra`.`Historico` ;

CREATE  TABLE IF NOT EXISTS `sinatra`.`Historico` (
    `id` INT NOT NULL AUTO_INCREMENT ,
    `tipoSessao` VARCHAR(2000) NOT NULL ,
    `idTerapeuta` INT NOT NULL ,
    `dataHora` DATETIME NOT NULL ,
    `dataInicio` DATE NOT NULL ,
    `dataFim` DATE NOT NULL ,
    `idCriancas` VARCHAR(2000) NOT NULL ,
    `tipoExercicio` VARCHAR(2000) NOT NULL ,
    `idExercicio` INT NOT NULL ,
    `idCenasPontuacao` VARCHAR(2000) NOT NULL ,
    `logSessao` VARCHAR(2000) NOT NULL ,
    `anotacoesSessao` VARCHAR(2000) NOT NULL ,
    PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sinatra`.`Historia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sinatra`.`Historia` ;

CREATE  TABLE IF NOT EXISTS `sinatra`.`Historia` (
    `id` INT NOT NULL AUTO_INCREMENT ,
    `thumbnail` VARCHAR(255) NULL ,
    `nome` VARCHAR(255) NOT NULL ,
    `descricao` VARCHAR(255) NULL ,
    `idCenas` VARCHAR(255) NULL,
    `tags` VARCHAR(255) NULL,
    `versao` DATETIME NOT NULL,
    PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sinatra`.`Cena`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sinatra`.`Cena` ;

CREATE  TABLE IF NOT EXISTS `sinatra`.`Cena` (
    `id` INT NOT NULL AUTO_INCREMENT ,
    `thumbnail` VARCHAR(2000) NULL ,
    `nome` VARCHAR(255) NOT NULL ,
    `descricao` VARCHAR(255) NULL ,
    `tags` VARCHAR(2000) NULL,
    `urlIntroducao` VARCHAR(2000) NOT NULL,
    `mimeTypeIntroducao` VARCHAR(2000) NOT NULL,
    `tipoActividade` VARCHAR(255) NOT NULL,
    `nrRepeticaoGesto` VARCHAR(2000) NOT NULL,
    `idActividades` VARCHAR(2000) NOT NULL,
    `urlReforcoPositivo` VARCHAR(2000) NOT NULL,
    `mimeTypeReforcoPositivo` VARCHAR(2000) NOT NULL,
    `urlReforcoPositivoThumb` VARCHAR(2000) NOT NULL,
    `urlReforcoNegativo` VARCHAR(2000) NOT NULL,
    `mimeTypeReforcoNegativo` VARCHAR(2000) NOT NULL,
    `urlReforcoNegativoThumb` VARCHAR(2000) NOT NULL,
    `nrVezesCena` INT NOT NULL,
    `pontuacao` TINYINT NOT NULL,
    `versao` DATETIME NOT NULL,
    PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sinatra`.`Etiqueta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sinatra`.`Etiqueta` ;

CREATE  TABLE IF NOT EXISTS `sinatra`.`Etiqueta` (
    `id` INT NOT NULL AUTO_INCREMENT ,
    `nomeEtiqueta` VARCHAR(2000) NOT NULL ,
    PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sinatra`.`Gesto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sinatra`.`Gesto` ;

CREATE  TABLE IF NOT EXISTS `sinatra`.`Gesto` (
    `id` INT NOT NULL AUTO_INCREMENT ,
    `nomeGesto` VARCHAR(2000) NOT NULL ,
    PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sinatra`.`Questionario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sinatra`.`Questionario` ;

CREATE  TABLE IF NOT EXISTS `sinatra`.`Questionario` (
    `id` INT NOT NULL AUTO_INCREMENT ,
    `nomeQuestionario` VARCHAR(255) NOT NULL ,
    `idPerguntas` VARCHAR(2000) NOT NULL ,
    PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sinatra`.`Pergunta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sinatra`.`Pergunta` ;

CREATE  TABLE IF NOT EXISTS `sinatra`.`Pergunta` (
    `id` INT NOT NULL AUTO_INCREMENT ,
    `questao` VARCHAR(2000) NOT NULL ,
    PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sinatra`.`Registo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sinatra`.`Registo` ;

CREATE  TABLE IF NOT EXISTS `sinatra`.`Registo` (
    `id` INT NOT NULL AUTO_INCREMENT ,
    `idSessao` INT NOT NULL,
    `idCena` INT NOT NULL,
    `nrRepeticaoCena` INT NOT NULL,
    `idCrianca` INT NOT NULL,
    `tipoRegisto` VARCHAR(2000) NOT NULL,
    `idGesto` INT NOT NULL,
    `nrRepeticaoGesto` INT NOT NULL,
    `respostaGesto` VARCHAR(2000) NOT NULL ,
    `pontuacaoGesto` INT NOT NULL ,
    `idQuestionario` INT NOT NULL,
    `idPergunta` INT NOT NULL,
    `respostaPergunta` VARCHAR(2000) NOT NULL ,
    `pontuacaoCena` INT NOT NULL,
    PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sinatra`.`LastLogin`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sinatra`.`LastLogin`;

CREATE  TABLE IF NOT EXISTS `sinatra`.`LastLogin` (
    `id` INT NOT NULL AUTO_INCREMENT ,
    `lastLogin` DATETIME NOT NULL ,
    PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- Deve ser inserido no final do ficheiro
-- Faz reset as variaveis alteradas no inicio do ficheiro
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Dados para serem inseridos inicialmente
-- -----------------------------------------------------
START TRANSACTION;
USE `sinatra`;
-- -----------------------------------------------------
-- Data for table `sinatra`.`Terapeuta`
-- -----------------------------------------------------
INSERT INTO `sinatra`.`Terapeuta` (`id`, `foto`, `nome`, `password`, `enable`) VALUES (1, '../server/files/fotosTerapeuta/Ana Almeida.png', 'Ana Almeida', 'sinatra', 1);
INSERT INTO `sinatra`.`Terapeuta` (`id`, `foto`, `nome`, `password`, `enable`) VALUES (2, '../server/files/fotosTerapeuta/Ana Matos.jpg', 'Ana Matos', 'sinatra', 1);
INSERT INTO `sinatra`.`Terapeuta` (`id`, `foto`, `nome`, `password`, `enable`) VALUES (3, '../server/files/fotosTerapeuta/Nuno Almeida.jpg', 'Nuno Almeida', 'sinatra', 1);
INSERT INTO `sinatra`.`Terapeuta` (`id`, `foto`, `nome`, `password`, `enable`) VALUES (4, '../server/files/fotosTerapeuta/Nuno Matos.gif', 'Nuno Matos', 'sinatra', 1);
INSERT INTO `sinatra`.`Terapeuta` (`id`, `foto`, `nome`, `password`, `enable`) VALUES (5, '../server/files/fotosTerapeuta/Vicente Veiga.jpg', 'Vicente Veiga', 'sinatra', 1);
INSERT INTO `sinatra`.`Terapeuta` (`id`, `foto`, `nome`, `password`, `enable`) VALUES (6, '../server/files/fotosTerapeuta/Leandro Batista.gif', 'Leandro Batista', 'sinatra', 1);
INSERT INTO `sinatra`.`Terapeuta` (`id`, `foto`, `nome`, `password`, `enable`) VALUES (7, '../server/files/fotosTerapeuta/João Gomes.jpg', 'João Gomes', 'sinatra', 1);
INSERT INTO `sinatra`.`Terapeuta` (`id`, `foto`, `nome`, `password`, `enable`) VALUES (8, '../server/files/fotosTerapeuta/João Carraca.jpg', 'João Carraca', 'sinatra', 1);
INSERT INTO `sinatra`.`Terapeuta` (`id`, `foto`, `nome`, `password`, `enable`) VALUES (9, '../server/files/fotosTerapeuta/André Contente.png', 'André Contente', 'sinatra', 1);
INSERT INTO `sinatra`.`Terapeuta` (`id`, `foto`, `nome`, `password`, `enable`) VALUES (10, '../server/files/fotosTerapeuta/Ricardo Bandola.jpg', 'Ricardo Bandola', 'sinatra', 1);
INSERT INTO `sinatra`.`Terapeuta` (`id`, `foto`, `nome`, `password`, `enable`) VALUES (11, '../server/files/fotosTerapeuta/Vitor Martins.png', 'Vitor Martins', 'sinatra', 1);
INSERT INTO `sinatra`.`Terapeuta` (`id`, `foto`, `nome`, `password`, `enable`) VALUES (12, '../server/files/fotosTerapeuta/Carlos Duarte.png', 'Carlos Duarte', 'sinatra', 1);
INSERT INTO `sinatra`.`Terapeuta` (`id`, `foto`, `nome`, `password`, `enable`) VALUES (13, '../server/files/fotosTerapeuta/Luís Carriço.jpg', 'Luís Carriço', 'sinatra', 1);
INSERT INTO `sinatra`.`Terapeuta` (`id`, `foto`, `nome`, `password`, `enable`) VALUES (14, '../server/files/fotosTerapeuta/Luís Tavares.jpg', 'Luís Tavares', 'sinatra', 1);
INSERT INTO `sinatra`.`Terapeuta` (`id`, `foto`, `nome`, `password`, `enable`) VALUES (15, '../server/files/fotosTerapeuta/Rafael Nunes.jpg', 'Rafael Nunes', 'sinatra', 1);
INSERT INTO `sinatra`.`Terapeuta` (`id`, `foto`, `nome`, `password`, `enable`) VALUES (16, '../server/files/fotosTerapeuta/Fábio Rito.jpg', 'Fábio Rito', 'sinatra', 1);
INSERT INTO `sinatra`.`Terapeuta` (`id`, `foto`, `nome`, `password`, `enable`) VALUES (17, '../server/files/fotosTerapeuta/Tiago Guerreiro.jpg', 'Tiago Guerreiro', 'sinatra', 1);

-- -----------------------------------------------------
-- Data for table `sinatra`.`Crianca`
-- -----------------------------------------------------
INSERT INTO `sinatra`.`Crianca` (`id`, `foto`, `username`, `nome`, `dataNascimento`, `observacao`, `password`, `enable`) VALUES (1, '../server/files/fotosCrianca/Ana Almeida.png', 'aalmeida', 'Ana Almeida', NOW(), '123', 'sinatra', 1);
INSERT INTO `sinatra`.`Crianca` (`id`, `foto`, `username`, `nome`, `dataNascimento`, `observacao`, `password`, `enable`) VALUES (2, '../server/files/fotosCrianca/Ana Matos.jpg', 'amatos', 'Ana Matos', '2012-10-18', '123', 'sinatra', 1);
INSERT INTO `sinatra`.`Crianca` (`id`, `foto`, `username`, `nome`, `dataNascimento`, `observacao`, `password`, `enable`) VALUES (3, '../server/files/fotosCrianca/Nuno Almeida.jpg', 'nalmeida', 'Nuno Almeida', '2012-10-19', '123', 'sinatra', 1);
INSERT INTO `sinatra`.`Crianca` (`id`, `foto`, `username`, `nome`, `dataNascimento`, `observacao`, `password`, `enable`) VALUES (4, '../server/files/fotosCrianca/Nuno Matos.gif', 'nmatos', 'Nuno Matos', '2012-10-20', '123', 'sinatra', 1);
INSERT INTO `sinatra`.`Crianca` (`id`, `foto`, `username`, `nome`, `dataNascimento`, `observacao`, `password`, `enable`) VALUES (5, '../server/files/fotosCrianca/Vicente Veiga.jpg', 'vveiga', 'Vicente Veiga', '2012-10-21', '123', 'sinatra', 1);
INSERT INTO `sinatra`.`Crianca` (`id`, `foto`, `username`, `nome`, `dataNascimento`, `observacao`, `password`, `enable`) VALUES (6, '../server/files/fotosCrianca/Leandro Batista.gif', 'lbatista', 'Leandro Batista', '2012-10-22', '123', 'sinatra', 1);
INSERT INTO `sinatra`.`Crianca` (`id`, `foto`, `username`, `nome`, `dataNascimento`, `observacao`, `password`, `enable`) VALUES (7, '../server/files/fotosCrianca/João Gomes.jpg', 'jgomes', 'João Gomes', '2012-10-23', '123', 'sinatra', 1);
INSERT INTO `sinatra`.`Crianca` (`id`, `foto`, `username`, `nome`, `dataNascimento`, `observacao`, `password`, `enable`) VALUES (8, '../server/files/fotosCrianca/João Carraca.jpg', 'jcarraca', 'João Carraca', '2012-10-24', '123', 'sinatra', 1);
INSERT INTO `sinatra`.`Crianca` (`id`, `foto`, `username`, `nome`, `dataNascimento`, `observacao`, `password`, `enable`) VALUES (9, '../server/files/fotosCrianca/André Contente.png', 'acontente', 'André Contente', '2012-10-25', '123', 'sinatra', 1);
INSERT INTO `sinatra`.`Crianca` (`id`, `foto`, `username`, `nome`, `dataNascimento`, `observacao`, `password`, `enable`) VALUES (10, '../server/files/fotosCrianca/Ricardo Bandola.jpg', 'rbandola', 'Ricardo Bandola', '2012-10-26', '123', 'sinatra', 1);
INSERT INTO `sinatra`.`Crianca` (`id`, `foto`, `username`, `nome`, `dataNascimento`, `observacao`, `password`, `enable`) VALUES (11, '../server/files/fotosCrianca/Vitor Martins.png', 'vmartins', 'Vitor Martins', '2012-10-27', '123', 'sinatra', 1);
INSERT INTO `sinatra`.`Crianca` (`id`, `foto`, `username`, `nome`, `dataNascimento`, `observacao`, `password`, `enable`) VALUES (12, '../server/files/fotosCrianca/Carlos Duarte.png', 'cduarte', 'Carlos Duarte', '2012-10-28', '123', 'sinatra', 1);
INSERT INTO `sinatra`.`Crianca` (`id`, `foto`, `username`, `nome`, `dataNascimento`, `observacao`, `password`, `enable`) VALUES (13, '../server/files/fotosCrianca/Luís Carriço.jpg', 'lcarrico', 'Luís Carriço', '2012-10-29', '123', 'sinatra', 1);
INSERT INTO `sinatra`.`Crianca` (`id`, `foto`, `username`, `nome`, `dataNascimento`, `observacao`, `password`, `enable`) VALUES (14, '../server/files/fotosCrianca/Luís Tavares.jpg', 'ltavares', 'Luís Tavares', '2012-10-30', '123', 'sinatra', 1);
INSERT INTO `sinatra`.`Crianca` (`id`, `foto`, `username`, `nome`, `dataNascimento`, `observacao`, `password`, `enable`) VALUES (15, '../server/files/fotosCrianca/Rafael Nunes.jpg', 'rnunes', 'Rafael Nunes', '2012-10-31', '123', 'sinatra', 1);
INSERT INTO `sinatra`.`Crianca` (`id`, `foto`, `username`, `nome`, `dataNascimento`, `observacao`, `password`, `enable`) VALUES (16, '../server/files/fotosCrianca/Fábio Rito.jpg', 'frito', 'Fábio Rito', '2012-11-01', '123', 'sinatra', 1);
INSERT INTO `sinatra`.`Crianca` (`id`, `foto`, `username`, `nome`, `dataNascimento`, `observacao`, `password`, `enable`) VALUES (17, '../server/files/fotosCrianca/Tiago Guerreiro.jpg', 'tguerreiro', 'Tiago Guerreiro', '2012-11-02', '123', 'sinatra', 1);

-- -----------------------------------------------------
-- Data for table `sinatra`.`Sessao`
-- -----------------------------------------------------
INSERT INTO `sinatra`.`Sessao` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (1, 'Presencial', '1', '2014-07-10 17:56:00', '', '', '1, 2, 9, 12, 16, ', 'História', '1', '1, 2, 3, ');
INSERT INTO `sinatra`.`Sessao` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (2, 'Remota', '4', '', '2014-07-20', '2014-07-27', '16, 8, 7, ', 'Historia', '1', '1, 2, 3, ');
INSERT INTO `sinatra`.`Sessao` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (3, 'Presencial', '2', '2014-07-21 17:12:00', '', '', '12, ', 'História', '1', '1, 2, 3,');
INSERT INTO `sinatra`.`Sessao` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (4, 'Presencial', '5', '2014-07-22 17:56:00', '', '', '1, 12, 16, 15, 10, ', 'Historia',  '1', '1, 2, 3, ');
INSERT INTO `sinatra`.`Sessao` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (5, 'Presencial', '2', '2014-07-23 17:56:00', '', '', '12, ', 'História', '1', '1, 2, 3, ');
INSERT INTO `sinatra`.`Sessao` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (6, 'Presencial', '4', '2014-07-13 16:32:00', '', '', '8, 7, ', 'História', '1', '1, 2, 3, ');
INSERT INTO `sinatra`.`Sessao` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (7, 'Presencial', '11', '2014-07-21 15:56:00', '', '', '7, 6, 13, 14, ', 'História', '1', '1, 2, 3, ');
INSERT INTO `sinatra`.`Sessao` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (8, 'Presencial', '6', '2014-07-25 12:56:00', '', '', '6, ', 'História', '1', '1, 2, 3, ');
INSERT INTO `sinatra`.`Sessao` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (9, 'Presencial', '3', '2014-07-20 17:52:00', '', '', '11, ', 'História', '1', '1, 2, 3, ');
INSERT INTO `sinatra`.`Sessao` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (10, 'Presencial', '1', '2014-07-22 14:56:00', '', '', '5, ', 'História', '1', '1, 2, 3, ');
INSERT INTO `sinatra`.`Sessao` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (11, 'Presencial', '2', '2014-06-01 17:56:00', '', '', '10, ', 'História', '1', '1, 2, 3, ');
INSERT INTO `sinatra`.`Sessao` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (12, 'Presencial', '2', '2014-05-23 17:56:00', '', '', '11, ', 'História', '1', '1, 2, 3, ');
INSERT INTO `sinatra`.`Sessao` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (13, 'Presencial', '7', '2014-05-06 12:56:00', '', '', '4, ', 'História', '1', '1, 2, 3, ');
INSERT INTO `sinatra`.`Sessao` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (14, 'Presencial', '9', '2014-05-01 17:50:00', '', '', '6, ', 'História', '1', '1, 2, 3, ');

-- -----------------------------------------------------
-- Data for table `sinatra`.`Historico`
-- -----------------------------------------------------
INSERT INTO `sinatra`.`Historico` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (1, 'Presencial', '1', '2014-03-20 17:56:00', '', '', '1, 2, 9, 12, 16, ', 'História', '1', '1, 2, 3, ');
INSERT INTO `sinatra`.`Historico` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (2, 'Presencial', '4', '2014-03-20 17:00:00', '', '', '16, 8, 7, ', 'História', '1', '1, 2, 3, ');
INSERT INTO `sinatra`.`Historico` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (3, 'Presencial', '2', '2014-03-21 17:12:00', '', '', '12, ', 'História', '1', '1, 2, 3, ');
INSERT INTO `sinatra`.`Historico` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (4, 'Presencial', '5', '2014-03-22 17:56:00', '', '', '1, 12, 16, 15, 10, ', 'História', '1', '1, 2, 3, ');
INSERT INTO `sinatra`.`Historico` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (5, 'Presencial', '2', '2014-03-23 17:56:00', '', '', '12, ', 'História', '1', '1, 2, 3, ');
INSERT INTO `sinatra`.`Historico` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (6, 'Presencial', '4', '2014-03-20 16:32:00', '', '', '8, 7, ', 'História', '1',  '1, 2, 3, ');
INSERT INTO `sinatra`.`Historico` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (7, 'Presencial', '11', '2014-03-21 15:56:00', '', '', '7, 6, 13, 14, ', 'História', '1',  '1, 2, 3, ');
INSERT INTO `sinatra`.`Historico` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (8, 'Presencial', '6', '2014-03-25 12:56:00', '', '', '6, ', 'História', '1',  '1, 2, 3, ');
INSERT INTO `sinatra`.`Historico` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (9, 'Presencial', '3', '2014-04-20 17:52:00', '', '', '11, ', 'História', '1',  '1, 2, 3, ');
INSERT INTO `sinatra`.`Historico` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (10, 'Presencial', '1', '2014-04-22 14:56:00', '', '', '5, ', 'História', '1',  '1, 2, 3, ');
INSERT INTO `sinatra`.`Historico` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (11, 'Presencial', '2', '2014-04-01 17:56:00', '', '', '10, ', 'História', '1',  '1, 2, 3, ');
INSERT INTO `sinatra`.`Historico` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (12, 'Presencial', '2', '2014-04-23 17:56:00', '', '', '11, ', 'História', '1',  '1, 2, 3, ');
INSERT INTO `sinatra`.`Historico` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (13, 'Presencial', '7', '2014-04-06 12:56:00', '', '', '4, ', 'História', '1',  '1, 2, 3, ');
INSERT INTO `sinatra`.`Historico` (`id`, `tipoSessao`, `idTerapeuta`, `dataHora`, `dataInicio`, `dataFim`, `idCriancas`, `tipoExercicio`, `idExercicio`, `idCenasPontuacao`) VALUES (14, 'Presencial', '9', '2014-04-01 17:50:00', '', '', '6, ', 'História', '1',  '1, 2, 3, ');

-- -----------------------------------------------------
-- Data for table `sinatra`.`Historia`
-- -----------------------------------------------------
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`, `versao`) VALUES (1, '../server/files/thumbsHistoria/historia1.jpg', 'historia1', 'descricao1', '5, 6, 7, ', '1, 2, ', '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (2, '../server/files/thumbsHistoria/historia2.jpg', 'historia2', 'descricao2', '1, ', '2, ', '2014-03-02 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (3, '../server/files/thumbsHistoria/historia3.jpg', 'historia3', 'descricao3', '2, ', '3, ', '2014-03-03 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (4, '../server/files/thumbsHistoria/historia4.jpg', 'historia4', 'descricao4', '3, ', '4, ', '2014-03-04 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (5, '../server/files/thumbsHistoria/historia5.jpg', 'historia5', 'descricao5', '3, 2, 1, ', '5, ', '2014-03-05 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (6, '../server/files/thumbsHistoria/historia6.png', 'historia6', 'descricao6', '2, 1, 3, ', '6, ', '2014-03-05 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`, `versao`) VALUES (7, '../server/files/thumbsHistoria/historia1.jpg', 'historia1', 'descricao1', '1, 2, 3, ', '1, 2, ', '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (8, '../server/files/thumbsHistoria/historia2.jpg', 'historia2', 'descricao2', '1, ', '2, 3, ', '2014-03-02 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (9, '../server/files/thumbsHistoria/historia3.jpg', 'historia3', 'descricao3', '2, ', '3, 4, ', '2014-03-03 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (10, '../server/files/thumbsHistoria/historia4.jpg', 'historia4', 'descricao4', '3, ', '4, 5, ', '2014-03-04 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (11, '../server/files/thumbsHistoria/historia5.jpg', 'historia5', 'descricao5', '3, 2, 1, ', '5, 6, ', '2014-03-05 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (12, '../server/files/thumbsHistoria/historia6.png', 'historia6', 'descricao6', '2, 1, 3, ', '6, 7, ', '2014-03-05 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`, `versao`) VALUES (13, '../server/files/thumbsHistoria/historia1.jpg', 'historia1', 'descricao1', '1, 2, 3, ', '1, 2, 3, ', '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (14, '../server/files/thumbsHistoria/historia2.jpg', 'historia2', 'descricao2', '1, ', '2, 3, 4, ', '2014-03-02 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (15, '../server/files/thumbsHistoria/historia3.jpg', 'historia3', 'descricao3', '2, ', '2, 3, 4, 5, ', '2014-03-03 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (16, '../server/files/thumbsHistoria/historia4.jpg', 'historia4', 'descricao4', '3, ', '2, 3, 4, 5, 6, ', '2014-03-04 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (17, '../server/files/thumbsHistoria/historia5.jpg', 'historia5', 'descricao5', '3, 2, 1, ', '4, 5, 6, ', '2014-03-05 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (18, '../server/files/thumbsHistoria/historia6.png', 'historia6', 'descricao6', '2, 1, 3, ', '4, 5, 6, ', '2014-03-05 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`, `versao`) VALUES (19, '../server/files/thumbsHistoria/historia1.jpg', 'historia1', 'descricao1', '1, 2, 3, ', '4, 5, 6, ', '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (20, '../server/files/thumbsHistoria/historia2.jpg', 'historia2', 'descricao2', '1, ', '4, 5, 6, 7, ', '2014-03-02 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (21, '../server/files/thumbsHistoria/historia3.jpg', 'historia3', 'descricao3', '2, ', '4, 5, 6, 7, ', '2014-03-03 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (22, '../server/files/thumbsHistoria/historia4.jpg', 'historia4', 'descricao4', '3, ', '4, 5, 6, 7, ', '2014-03-04 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (23, '../server/files/thumbsHistoria/historia5.jpg', 'historia5', 'descricao5', '3, 2, 1, ', '4, 5, 6, 7, 8, ', '2014-03-05 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (24, '../server/files/thumbsHistoria/historia6.png', 'historia6', 'descricao6', '2, 1, 3, ', '4, 5, 6, 7, 8, ', '2014-03-05 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`, `versao`) VALUES (25, '../server/files/thumbsHistoria/historia1.jpg', 'historia1', 'descricao1', '1, 2, 3, ', '4, 5, 6, 7, 8, ', '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (26, '../server/files/thumbsHistoria/historia2.jpg', 'historia2', 'descricao2', '1, ', '4, 5, 6, 7, 8, ', '2014-03-02 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (27, '../server/files/thumbsHistoria/historia3.jpg', 'historia3', 'descricao3', '2, ', '4, 5, 6, 7, 8, ', '2014-03-03 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (28, '../server/files/thumbsHistoria/historia4.jpg', 'historia4', 'descricao4', '3, ', '4, 5, 6, 7, 8, ', '2014-03-04 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (29, '../server/files/thumbsHistoria/historia5.jpg', 'historia5', 'descricao5', '3, 2, 1, ', '1, 2, 3, 4, 5, 6, 7, 8, ', '2014-03-05 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (30, '../server/files/thumbsHistoria/historia6.png', 'historia6', 'descricao6', '2, 1, 3, ', '1, 2, 3, 4, 5, 6, 7, 8, ', '2014-03-05 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`, `versao`) VALUES (31, '../server/files/thumbsHistoria/historia1.jpg', 'historia1', 'descricao1', '1, 2, 3, ', '1, 2, 3, 4, 5, 6, 7, 8, ', '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (32, '../server/files/thumbsHistoria/historia2.jpg', 'historia2', 'descricao2', '1, ', '1, 2, 3, 4, 5, 6, 7, 8, ', '2014-03-02 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (33, '../server/files/thumbsHistoria/historia3.jpg', 'historia3', 'descricao3', '2, ', '1, 2, 3, 4, 5, 6, 7, 8, ', '2014-03-03 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (34, '../server/files/thumbsHistoria/historia4.jpg', 'historia4', 'descricao4', '3, ', '1, 2, 3, 4, 5, 6, 7, 8, ', '2014-03-04 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (35, '../server/files/thumbsHistoria/historia5.jpg', 'historia5', 'descricao5', '3, 2, 1, ', '1, 2, 3, 4, 5, 6, 7, 8, ', '2014-03-05 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (36, '../server/files/thumbsHistoria/historia6.png', 'historia6', 'descricao6', '2, 1, 3, ', '1, 2, 3, 4, 5, 6, 7, 8, ', '2014-03-05 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`, `versao`) VALUES (37, '../server/files/thumbsHistoria/historia1.jpg', 'historia1', 'descricao1', '1, 2, 3, ', '1, 2, 3, 4, 5, 6, 7, 8, ', '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (38, '../server/files/thumbsHistoria/historia2.jpg', 'historia2', 'descricao2', '1, ', '1, 2, 3, 4, 5, 6, 7, 8, ', '2014-03-02 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (39, '../server/files/thumbsHistoria/historia3.jpg', 'historia3', 'descricao3', '2, ', '1, 2, 3, 4, 5, 6, 7, 8, ', '2014-03-03 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (40, '../server/files/thumbsHistoria/historia4.jpg', 'historia4', 'descricao4', '3, ', '1, 2, 3, 4, 5, 6, 7, 8, ', '2014-03-04 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (41, '../server/files/thumbsHistoria/historia5.jpg', 'historia5', 'descricao5', '3, 2, 1, ', '1, 2, 3, 4, 5, 6, 7, 8, ', '2014-03-05 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (42, '../server/files/thumbsHistoria/historia6.png', 'historia6', 'descricao6', '2, 1, 3, ', '1, 2, 3, 4, 5, 6, 7, 8, ', '2014-03-05 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`, `versao`) VALUES (43, '../server/files/thumbsHistoria/historia1.jpg', 'historia1', 'descricao1', '1, 2, 3, ', '1, 4, 7, 8, ', '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (44, '../server/files/thumbsHistoria/historia2.jpg', 'historia2', 'descricao2', '1, ', '1, 2, 3, 4, 5, 6, 7, 8, ', '2014-03-02 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (45, '../server/files/thumbsHistoria/historia3.jpg', 'historia3', 'descricao3', '2, ', '1, 2, 7, 8, ', '2014-03-03 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (46, '../server/files/thumbsHistoria/historia4.jpg', 'historia4', 'descricao4', '3, ', '2, 4, 6, 7, 8, ', '2014-03-04 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (47, '../server/files/thumbsHistoria/historia5.jpg', 'historia5', 'descricao5', '3, 2, 1, ', '1, 2, 3, 4, 5, 6, 7, 8, ', '2014-03-05 17:50:00');
INSERT INTO `sinatra`.`Historia` (`id`, `thumbnail`, `nome`, `descricao`, `idCenas`, `tags`,  `versao`) VALUES (48, '../server/files/thumbsHistoria/historia6.png', 'historia6', 'descricao6', '2, 1, 3, ', '1, 2, 3, 4, 5, 6, 7, 8, ', '2014-03-05 17:50:00');

-- -----------------------------------------------------
-- Data for table `sinatra`.`Cena`
-- -----------------------------------------------------
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`, `urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (1, '../server/files/thumbsCena/cena1.jpg', 'cena1', 'descricao1', '1, 2, 3, 4, ','../server/files/introducaoActividade/cena1', 'video', '1, ', 'Gesto', '1, ', '../server/files/reforcoPositivo/cena1', 'imagem', '../server/files/thumbsReforcoPositivo/cena1.jpg', '../server/files/reforcoNegativo/cena1.jpg', 'imagem', '../server/files/thumbsReforcoNegativo/cena1.jpg', 1, 1, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (2, '../server/files/thumbsCena/cena2.png', 'cena2', 'descricao2', '2, 3, 4, ', '../server/files/introducaoActividade/cena2', 'video', '1, ', 'Questionario',  '0', '../server/files/reforcoPositivo/cena2', 'video', '../server/files/thumbsReforcoPositivo/cena2.jpg', '../server/files/reforcoNegativo/cena2', 'video', '../server/files/thumbsReforcoNegativo/cena2.jpg', 1,  1, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (3, '../server/files/thumbsCena/cena3.jpg', 'cena3', 'descricao3', '3, ', '../server/files/introducaoActividade/cena3', 'video', '2, ', 'Gesto',  '2, ', '../server/files/reforcoPositivo/cena3', 'video', '../server/files/thumbsReforcoPositivo/cena3.jpg', '../server/files/reforcoNegativo/cena3', 'video', '../server/files/thumbsReforcoNegativo/cena3.jpg', 2,  1, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (4, '../server/files/thumbsCena/cena4.jpg', 'cena4', 'descricao4', '4, 5, 6, ', '../server/files/introducaoActividade/cena4', 'video', '2, ', 'Questionario', '0', '../server/files/reforcoPositivo/cena4.png', 'imagem', '../server/files/thumbsReforcoPositivo/cena4.jpg', '../server/files/reforcoNegativo/cena4.png', 'imagem', '../server/files/thumbsReforcoNegativo/cena4.jpg', 3, 0, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (5, '../server/files/thumbsCena/cena5.jpg', 'cena5', 'descricao5', '5, 6, ', '../server/files/introducaoActividade/cena5.gif', 'imagem', '3, ', 'Gesto', '3, ', '../server/files/reforcoPositivo/cena5', 'video', '../server/files/thumbsReforcoPositivo/cena5.jpg', '../server/files/reforcoNegativo/cena5', 'video', '../server/files/thumbsReforcoNegativo/cena5.jpg', 1, 0, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (6, '../server/files/thumbsCena/cena6.jpg', 'cena6', 'descricao6', '6, ', '../server/files/introducaoActividade/cena6', 'video', '4, ', 'Questionario', '0', '../server/files/reforcoPositivo/cena6', 'video', '../server/files/thumbsReforcoPositivo/cena4.jpg', '../server/files/reforcoNegativo/cena6', 'video', '../server/files/thumbsReforcoNegativo/cena6.jpg', 1, 0, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`, `urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (7, '../server/files/thumbsCena/cena1.jpg', 'cena1', 'descricao1', '1, 2, 3, 4, ','../server/files/introducaoActividade/cena1', 'video', '1, ', 'Gesto', '1, ', '../server/files/reforcoPositivo/cena1.jpg', 'imagem', '../server/files/thumbsReforcoPositivo/cena1.jpg', '../server/files/reforcoNegativo/cena1.jpg', 'imagem', '../server/files/thumbsReforcoNegativo/cena1.jpg', 1, 1, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (8, '../server/files/thumbsCena/cena2.png', 'cena2', 'descricao2', '2, 3, 4, ', '../server/files/introducaoActividade/cena2', 'video', '1, ', 'Questionario',  '0', '../server/files/reforcoPositivo/cena2', 'video', '../server/files/thumbsReforcoPositivo/cena2.jpg', '../server/files/reforcoNegativo/cena2', 'video', '../server/files/thumbsReforcoNegativo/cena2.jpg', 1,  1, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (9, '../server/files/thumbsCena/cena3.jpg', 'cena3', 'descricao3', '3, ', '../server/files/introducaoActividade/cena3', 'video', '2, ', 'Gesto',  '2, ', '../server/files/reforcoPositivo/cena3', 'video', '../server/files/thumbsReforcoPositivo/cena3.jpg', '../server/files/reforcoNegativo/cena3', 'video', '../server/files/thumbsReforcoNegativo/cena3.jpg', 2,  1, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (10, '../server/files/thumbsCena/cena4.jpg', 'cena4', 'descricao4', '4, 5, 6, ', '../server/files/introducaoActividade/cena4', 'video', '2, ', 'Questionario', '0', '../server/files/reforcoPositivo/cena4.png', 'imagem', '../server/files/thumbsReforcoPositivo/cena4.jpg', '../server/files/reforcoNegativo/cena4.png', 'imagem', '../server/files/thumbsReforcoNegativo/cena4.jpg', 3, 0, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (11, '../server/files/thumbsCena/cena5.jpg', 'cena5', 'descricao5', '5, 6, ', '../server/files/introducaoActividade/cena5', 'video', '3, ', 'Gesto', '3, ', '../server/files/reforcoPositivo/cena5', 'video', '../server/files/thumbsReforcoPositivo/cena5.jpg', '../server/files/reforcoNegativo/cena5', 'video', '../server/files/thumbsReforcoNegativo/cena5.jpg', 4, 0, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (12, '../server/files/thumbsCena/cena6.jpg', 'cena6', 'descricao6', '6, ', '../server/files/introducaoActividade/cena6', 'video', '4, ', 'Questionario', '0', '../server/files/reforcoPositivo/cena6', 'video', '../server/files/thumbsReforcoPositivo/cena4.jpg', '../server/files/reforcoNegativo/cena6', 'video', '../server/files/thumbsReforcoNegativo/cena6.jpg', 5, 0, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`, `urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (13, '../server/files/thumbsCena/cena1.jpg', 'cena1', 'descricao1', '1, 2, 3, 4, ','../server/files/introducaoActividade/cena1', 'video', '1, ', 'Gesto', '1, ', '../server/files/reforcoPositivo/cena1.jpg', 'imagem', '../server/files/thumbsReforcoPositivo/cena1.jpg', '../server/files/reforcoNegativo/cena1.jpg', 'imagem', '../server/files/thumbsReforcoNegativo/cena1.jpg', 1, 1, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (14, '../server/files/thumbsCena/cena2.png', 'cena2', 'descricao2', '2, 3, 4, ', '../server/files/introducaoActividade/cena2', 'video', '1, ', 'Questionario',  '0', '../server/files/reforcoPositivo/cena2', 'video', '../server/files/thumbsReforcoPositivo/cena2.jpg', '../server/files/reforcoNegativo/cena2', 'video', '../server/files/thumbsReforcoNegativo/cena2.jpg', 1,  1, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (15, '../server/files/thumbsCena/cena3.jpg', 'cena3', 'descricao3', '3, ', '../server/files/introducaoActividade/cena3', 'video', '2, ', 'Gesto',  '2, ', '../server/files/reforcoPositivo/cena3', 'video', '../server/files/thumbsReforcoPositivo/cena3.jpg', '../server/files/reforcoNegativo/cena3', 'video', '../server/files/thumbsReforcoNegativo/cena3.jpg', 2,  1, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (16, '../server/files/thumbsCena/cena4.jpg', 'cena4', 'descricao4', '4, 5, 6, ', '../server/files/introducaoActividade/cena4', 'video', '2, ', 'Questionario', '0', '../server/files/reforcoPositivo/cena4.png', 'imagem', '../server/files/thumbsReforcoPositivo/cena4.jpg', '../server/files/reforcoNegativo/cena4.png', 'imagem', '../server/files/thumbsReforcoNegativo/cena4.jpg', 3, 0, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (17, '../server/files/thumbsCena/cena5.jpg', 'cena5', 'descricao5', '5, 6, ', '../server/files/introducaoActividade/cena5', 'video', '3, ', 'Gesto', '3, ', '../server/files/reforcoPositivo/cena5', 'video', '../server/files/thumbsReforcoPositivo/cena5.jpg', '../server/files/reforcoNegativo/cena5', 'video', '../server/files/thumbsReforcoNegativo/cena5.jpg', 4, 0, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (18, '../server/files/thumbsCena/cena6.jpg', 'cena6', 'descricao6', '6, ', '../server/files/introducaoActividade/cena6', 'video', '4, ', 'Questionario', '0', '../server/files/reforcoPositivo/cena6', 'video', '../server/files/thumbsReforcoPositivo/cena4.jpg', '../server/files/reforcoNegativo/cena6', 'video', '../server/files/thumbsReforcoNegativo/cena6.jpg', 5, 0, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`, `urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (19, '../server/files/thumbsCena/cena1.jpg', 'cena1', 'descricao1', '1, 2, 3, 4, ','../server/files/introducaoActividade/cena1', 'video', '1, ', 'Gesto', '1, ', '../server/files/reforcoPositivo/cena1.jpg', 'imagem', '../server/files/thumbsReforcoPositivo/cena1.jpg', '../server/files/reforcoNegativo/cena1.jpg', 'imagem', '../server/files/thumbsReforcoNegativo/cena1.jpg', 1, 1, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (20, '../server/files/thumbsCena/cena2.png', 'cena2', 'descricao2', '2, 3, 4, ', '../server/files/introducaoActividade/cena2', 'video', '1, ', 'Questionario',  '0', '../server/files/reforcoPositivo/cena2', 'video', '../server/files/thumbsReforcoPositivo/cena2.jpg', '../server/files/reforcoNegativo/cena2', 'video', '../server/files/thumbsReforcoNegativo/cena2.jpg', 1,  1, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (21, '../server/files/thumbsCena/cena3.jpg', 'cena3', 'descricao3', '3, ', '../server/files/introducaoActividade/cena3', 'video', '2, ', 'Gesto',  '2, ', '../server/files/reforcoPositivo/cena3', 'video', '../server/files/thumbsReforcoPositivo/cena3.jpg', '../server/files/reforcoNegativo/cena3', 'video', '../server/files/thumbsReforcoNegativo/cena3.jpg', 2,  1, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (22, '../server/files/thumbsCena/cena4.jpg', 'cena4', 'cena4', '4, 5, 6, ', '../server/files/introducaoActividade/cena4', 'video', '2, ', 'Questionario', '0', '../server/files/reforcoPositivo/cena4.png', 'imagem', '../server/files/thumbsReforcoPositivo/cena4.jpg', '../server/files/reforcoNegativo/cena4.png', 'imagem', '../server/files/thumbsReforcoNegativo/cena4.jpg', 3, 0, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (23, '../server/files/thumbsCena/cena5.jpg', 'cena5', 'descricao5', '5, 6, ', '../server/files/introducaoActividade/cena5', 'video', '3, ', 'Gesto', '3, ', '../server/files/reforcoPositivo/cena5', 'video', '../server/files/thumbsReforcoPositivo/cena5.jpg', '../server/files/reforcoNegativo/cena5', 'video', '../server/files/thumbsReforcoNegativo/cena5.jpg', 4, 0, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (24, '../server/files/thumbsCena/cena6.jpg', 'cena6', 'descricao6', '6, ', '../server/files/introducaoActividade/cena6', 'video', '4, ', 'Questionario', '0', '../server/files/reforcoPositivo/cena6', 'video', '../server/files/thumbsReforcoPositivo/cena4.jpg', '../server/files/reforcoNegativo/cena6', 'video', '../server/files/thumbsReforcoNegativo/cena6.jpg', 5, 0, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`, `urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (25, '../server/files/thumbsCena/cena1.jpg', 'cena1', 'descricao1', '1, 2, 3, 4, ','../server/files/introducaoActividade/cena1', 'video', '1, ', 'Gesto', '1, ', '../server/files/reforcoPositivo/cena1.jpg', 'imagem', '../server/files/thumbsReforcoPositivo/cena1.jpg', '../server/files/reforcoNegativo/cena1.jpg', 'imagem', '../server/files/thumbsReforcoNegativo/cena1.jpg', 1, 1, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (26, '../server/files/thumbsCena/cena2.png', 'cena2', 'descricao2', '2, 3, 4, ', '../server/files/introducaoActividade/cena2', 'video', '1, ', 'Questionario',  '0', '../server/files/reforcoPositivo/cena2', 'video', '../server/files/thumbsReforcoPositivo/cena2.jpg', '../server/files/reforcoNegativo/cena2', 'video', '../server/files/thumbsReforcoNegativo/cena2.jpg', 1,  1, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (27, '../server/files/thumbsCena/cena3.jpg', 'cena3', 'descricao3', '3, ', '../server/files/introducaoActividade/cena3', 'video', '2, ', 'Gesto',  '2, ', '../server/files/reforcoPositivo/cena3', 'video', '../server/files/thumbsReforcoPositivo/cena3.jpg', '../server/files/reforcoNegativo/cena3', 'video', '../server/files/thumbsReforcoNegativo/cena3.jpg', 2,  1, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (28, '../server/files/thumbsCena/cena4.jpg', 'cena4', 'descricao4', '4, 5, 6, ', '../server/files/introducaoActividade/cena4', 'video', '2, ', 'Questionario', '0', '../server/files/reforcoPositivo/cena4.png', 'imagem', '../server/files/thumbsReforcoPositivo/cena4.jpg', '../server/files/reforcoNegativo/cena4.png', 'imagem', '../server/files/thumbsReforcoNegativo/cena4.jpg', 3, 0, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (29, '../server/files/thumbsCena/cena5.jpg', 'cena5', 'descricao5', '5, 6, ', '../server/files/introducaoActividade/cena5', 'video', '3, ', 'Gesto', '3, ', '../server/files/reforcoPositivo/cena5', 'video', '../server/files/thumbsReforcoPositivo/cena5.jpg', '../server/files/reforcoNegativo/cena5', 'video', '../server/files/thumbsReforcoNegativo/cena5.jpg', 4, 0, '2014-03-01 17:50:00');
INSERT INTO `sinatra`.`Cena` (`id`, `thumbnail`, `nome`, `descricao`, `tags`, `urlIntroducao`, `mimeTypeIntroducao`, `idActividades`, `tipoActividade`, `nrRepeticaoGesto`,`urlReforcoPositivo`, `mimeTypeReforcoPositivo`, `urlReforcoPositivoThumb`, `urlReforcoNegativo`, `mimeTypeReforcoNegativo`, `urlReforcoNegativoThumb`, `nrVezesCena`, `pontuacao`, `versao`) VALUES (30, '../server/files/thumbsCena/cena6.jpg', 'cena6', 'descricao6', '6, ', '../server/files/introducaoActividade/cena6', 'video','4, ', 'Questionario', '0', '../server/files/reforcoPositivo/cena6', 'video', '../server/files/thumbsReforcoPositivo/cena4.jpg', '../server/files/reforcoNegativo/cena6', 'video', '../server/files/thumbsReforcoNegativo/cena6.jpg', 5, 0, '2014-03-01 17:50:00');

-- -----------------------------------------------------
-- Data for table `sinatra`.`Etiqueta`
-- -----------------------------------------------------
INSERT INTO `sinatra`.`Etiqueta` (`id`, `nomeEtiqueta`) VALUES (1, 'etiqueta1');
INSERT INTO `sinatra`.`Etiqueta` (`id`, `nomeEtiqueta`) VALUES (2, 'etiqueta2');
INSERT INTO `sinatra`.`Etiqueta` (`id`, `nomeEtiqueta`) VALUES (3, 'etiqueta3');
INSERT INTO `sinatra`.`Etiqueta` (`id`, `nomeEtiqueta`) VALUES (4, 'etiqueta4');
INSERT INTO `sinatra`.`Etiqueta` (`id`, `nomeEtiqueta`) VALUES (5, 'etiqueta5');
INSERT INTO `sinatra`.`Etiqueta` (`id`, `nomeEtiqueta`) VALUES (6, 'etiqueta6');
INSERT INTO `sinatra`.`Etiqueta` (`id`, `nomeEtiqueta`) VALUES (7, 'etiqueta7');
INSERT INTO `sinatra`.`Etiqueta` (`id`, `nomeEtiqueta`) VALUES (8, 'etiqueta8');

-- -----------------------------------------------------
-- Data for table `sinatra`.`Gesto`
-- -----------------------------------------------------
INSERT INTO `sinatra`.`Gesto` (`id`, `nomeGesto`) VALUES (1, 'gesto1');
INSERT INTO `sinatra`.`Gesto` (`id`, `nomeGesto`) VALUES (2, 'gesto2');
INSERT INTO `sinatra`.`Gesto` (`id`, `nomeGesto`) VALUES (3, 'gesto3');
INSERT INTO `sinatra`.`Gesto` (`id`, `nomeGesto`) VALUES (4, 'gesto4');
INSERT INTO `sinatra`.`Gesto` (`id`, `nomeGesto`) VALUES (5, 'gesto5');
INSERT INTO `sinatra`.`Gesto` (`id`, `nomeGesto`) VALUES (6, 'gesto6');
INSERT INTO `sinatra`.`Gesto` (`id`, `nomeGesto`) VALUES (7, 'gesto7');
INSERT INTO `sinatra`.`Gesto` (`id`, `nomeGesto`) VALUES (8, 'gesto8');

-- -----------------------------------------------------
-- Data for table `sinatra`.`Questionario`
-- -----------------------------------------------------
INSERT INTO `sinatra`.`Questionario` (`id`, `nomeQuestionario`, `idPerguntas`) VALUES (1, 'questionario1', '1, 2, 3, ');
INSERT INTO `sinatra`.`Questionario` (`id`, `nomeQuestionario`, `idPerguntas`) VALUES (2, 'questionario2', '1, 5, 3, ');
INSERT INTO `sinatra`.`Questionario` (`id`, `nomeQuestionario`, `idPerguntas`) VALUES (3, 'questionario3', '4, 5, 6, ');
INSERT INTO `sinatra`.`Questionario` (`id`, `nomeQuestionario`, `idPerguntas`) VALUES (4, 'questionario4', '1, 6, 3, ');
INSERT INTO `sinatra`.`Questionario` (`id`, `nomeQuestionario`, `idPerguntas`) VALUES (5, 'questionario5', '3, 7, 8, ');
INSERT INTO `sinatra`.`Questionario` (`id`, `nomeQuestionario`, `idPerguntas`) VALUES (6, 'questionario6', '7, 1, 9, ');
INSERT INTO `sinatra`.`Questionario` (`id`, `nomeQuestionario`, `idPerguntas`) VALUES (7, 'questionario7', '8, 6, 2, ');
INSERT INTO `sinatra`.`Questionario` (`id`, `nomeQuestionario`, `idPerguntas`) VALUES (8, 'questionario8', '8, 7, 6, ');

-- -----------------------------------------------------
-- Data for table `sinatra`.`Pergunta`
-- -----------------------------------------------------
INSERT INTO `sinatra`.`Pergunta` (`id`, `questao`) VALUES (1, 'pergunta1');
INSERT INTO `sinatra`.`Pergunta` (`id`, `questao`) VALUES (2, 'pergunta2');
INSERT INTO `sinatra`.`Pergunta` (`id`, `questao`) VALUES (3, 'pergunta3');
INSERT INTO `sinatra`.`Pergunta` (`id`, `questao`) VALUES (4, 'pergunta4');
INSERT INTO `sinatra`.`Pergunta` (`id`, `questao`) VALUES (5, 'pergunta5');
INSERT INTO `sinatra`.`Pergunta` (`id`, `questao`) VALUES (6, 'pergunta6');
INSERT INTO `sinatra`.`Pergunta` (`id`, `questao`) VALUES (7, 'pergunta7');
INSERT INTO `sinatra`.`Pergunta` (`id`, `questao`) VALUES (8, 'pergunta8');

COMMIT;
