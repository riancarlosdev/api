-- CreateTable
CREATE TABLE `enderecos` (
    `id` INTEGER NOT NULL,
    `identificacao` VARCHAR(15) NOT NULL,
    `cep` INTEGER NOT NULL,
    `rua` VARCHAR(25) NOT NULL,
    `numero` INTEGER NOT NULL,
    `referencia` VARCHAR(40) NOT NULL,
    `complemento` VARCHAR(170) NULL,
    `estado` VARCHAR(20) NOT NULL,
    `cidade` VARCHAR(20) NOT NULL,
    `bairro` VARCHAR(45) NOT NULL,
    `usuarioId` INTEGER NOT NULL,

    INDEX `fk_endereco_usuario_idx`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(14) NOT NULL,
    `sobrenome` VARCHAR(14) NOT NULL,
    `nascimento` VARCHAR(11) NOT NULL,
    `email` VARCHAR(250) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `senha` VARCHAR(16) NOT NULL,
    `telefone` VARCHAR(12) NULL,
    `whatsapp` VARCHAR(13) NULL,
    `status` ENUM('OK', 'PEND') NOT NULL DEFAULT 'PEND',
    `codeConfirm` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(12) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produtos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NOT NULL,
    `descricao` VARCHAR(50) NOT NULL,
    `qnt_estoque` INTEGER NOT NULL,
    `disponivel` TINYINT NOT NULL,
    `preco` DECIMAL(5, 2) NOT NULL,
    `preco_antigo` DECIMAL(5, 2) NULL,
    `tamanhos` VARCHAR(250) NULL,
    `cores` VARCHAR(250) NULL,
    `genero_id` INTEGER NOT NULL,

    INDEX `fk_produtos_genero1_idx`(`genero_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `enderecos` ADD CONSTRAINT `fk_endereco_usuario` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `produtos` ADD CONSTRAINT `fk_produtos_genero1` FOREIGN KEY (`genero_id`) REFERENCES `genero`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
