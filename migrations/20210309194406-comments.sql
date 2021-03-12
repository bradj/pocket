-- +migrate Up
CREATE TABLE comments
(
    id uuid not null default gen_random_uuid(),
    post_id uuid NOT NULL,
    account_id uuid NOT NULL,
    parent uuid,
    message character varying(240) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT comments_pkey PRIMARY KEY (id),
    CONSTRAINT comments_post_id_foreign FOREIGN KEY (post_id)
        REFERENCES posts (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT comments_account_id_foreign FOREIGN KEY (account_id)
        REFERENCES accounts (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE comments
    OWNER to pocketadmin;

CREATE INDEX comments_post_id_index
    ON comments USING hash
    (post_id)
    TABLESPACE pg_default;

-- +migrate Down
DROP TABLE comments;
