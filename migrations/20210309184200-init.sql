-- +migrate Up
CREATE TABLE accounts
(
    id uuid not null default gen_random_uuid(),
    username character varying(48) COLLATE pg_catalog."default" NOT NULL UNIQUE,
    email character varying(120) COLLATE pg_catalog."default" NOT NULL UNIQUE,
    hash character varying(1200) COLLATE pg_catalog."default" NOT NULL,
    avatar character varying(1000),
    tagline character varying(120),
    is_disabled boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT accounts_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE accounts
    OWNER to pocketadmin;

CREATE INDEX accounts_username_is_disabled_index
    ON accounts USING btree
    (username, is_disabled)
    TABLESPACE pg_default;

CREATE INDEX accounts_username_index
    ON accounts USING hash
    (username)
    TABLESPACE pg_default;

-- +migrate Down
DROP TABLE accounts;
