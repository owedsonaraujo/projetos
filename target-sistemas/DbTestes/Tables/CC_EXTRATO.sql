CREATE TABLE [dbo].[CC_EXTRATO]
(
	[Id]             VARCHAR(36)    PRIMARY KEY,
    [Descricao]      NVARCHAR(255) NOT NULL,
    [Data]           DATETIME      NOT NULL DEFAULT(GETDATE()),
    [Valor]          DECIMAL(18,2) NOT NULL,
    [Avulso]         BIT           NOT NULL, -- Usar 1 para avulso e 0 para não avulso
    [Status]         NVARCHAR(50)  NOT NULL CHECK (Status IN ('Válido', 'Cancelado'))
);
