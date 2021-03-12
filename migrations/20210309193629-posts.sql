-- +migrate Up
CREATE TABLE posts
(
    id uuid not null default gen_random_uuid(),
    page_id uuid NOT NULL,
    location character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    caption character varying(2000) COLLATE pg_catalog."default",
    is_disabled boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT posts_pkey PRIMARY KEY (id),
    CONSTRAINT posts_page_id_foreign FOREIGN KEY (page_id)
        REFERENCES pages (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE posts
    OWNER to pocketadmin;

CREATE INDEX posts_id_is_disabled_index
    ON posts USING btree
    (id, is_disabled)
    TABLESPACE pg_default;

CREATE INDEX posts_page_id_index
    ON posts USING hash
    (page_id)
    TABLESPACE pg_default;

-- +migrate Down
DROP TABLE posts;
