-- +migrate Up
CREATE TABLE pages
(
    id uuid not null default gen_random_uuid(),
    account_id uuid NOT NULL,
    name character varying(48) COLLATE pg_catalog."default" NOT NULL,
    is_disabled boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pages_pkey PRIMARY KEY (id),
    CONSTRAINT pages_account_id_foreign FOREIGN KEY (account_id)
        REFERENCES accounts (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE pages
    OWNER to pocketadmin;

CREATE INDEX pages_id_is_disabled_index
    ON pages USING btree
    (id, is_disabled)
    TABLESPACE pg_default;

CREATE INDEX pages_name_index
    ON pages USING hash
    (name)
    TABLESPACE pg_default;

-- +migrate Down
DROP TABLE pages;
