--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: sampleuser
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO sampleuser;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: sampleuser
--

COMMENT ON SCHEMA public IS '';


--
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: sampleuser
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'pending',
    'completed',
    'cancelled'
);


ALTER TYPE public."OrderStatus" OWNER TO sampleuser;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Product; Type: TABLE; Schema: public; Owner: sampleuser
--

CREATE TABLE public."Product" (
    id uuid NOT NULL,
    name text NOT NULL,
    description text,
    price numeric NOT NULL,
    quantity integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Product" OWNER TO sampleuser;

--
-- Name: SalesOrder; Type: TABLE; Schema: public; Owner: sampleuser
--

CREATE TABLE public."SalesOrder" (
    id uuid NOT NULL,
    order_date timestamp(3) without time zone NOT NULL,
    customer_name text NOT NULL,
    total_amount numeric NOT NULL,
    status public."OrderStatus" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."SalesOrder" OWNER TO sampleuser;

--
-- Name: SalesOrderItem; Type: TABLE; Schema: public; Owner: sampleuser
--

CREATE TABLE public."SalesOrderItem" (
    id uuid NOT NULL,
    sales_order_id uuid NOT NULL,
    product_id uuid NOT NULL,
    quantity integer NOT NULL,
    unit_price numeric NOT NULL,
    total_price numeric NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."SalesOrderItem" OWNER TO sampleuser;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: sampleuser
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO sampleuser;

--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: sampleuser
--

COPY public."Product" (id, name, description, price, quantity, created_at, updated_at) FROM stdin;
d38a6f5d-1bf4-495c-ba0b-1145eca2ad5e	MousePad	A pad for optical mouse to make it work smoothly	100	10	2024-12-25 12:45:40.594	2024-12-25 12:45:40.594
97b2fc7d-1171-4e01-8e11-b26c21b59988	Cup	A Glass up to drink tea or coffee or anything	100	30	2024-12-25 12:43:54.795	2024-12-25 13:31:46.989
590a1ed6-c7f1-4451-9bf0-d130b830da52	Hat	Hat for summer or rain or winter. anytime you can wear a hat!	4	10	2024-12-25 13:44:02.463	2024-12-25 13:44:02.463
\.


--
-- Data for Name: SalesOrder; Type: TABLE DATA; Schema: public; Owner: sampleuser
--

COPY public."SalesOrder" (id, order_date, customer_name, total_amount, status, created_at, updated_at) FROM stdin;
52d54fa3-b2e6-41cc-9356-21adcbf7188d	2024-12-25 12:53:11.943	Gulam Raza	600	cancelled	2024-12-25 12:53:12.379	2024-12-25 13:39:23.556
78a33083-bf68-46a7-a07a-e0f872159c3a	2024-12-25 13:33:11.416	Gulam Raza	300	completed	2024-12-25 13:33:12.037	2024-12-25 13:40:09.163
c025a956-ffb9-40b5-a89d-1477c19164fa	2024-12-25 13:44:37.262	Gulam Raza	300	completed	2024-12-25 13:44:37.282	2024-12-25 13:45:12.388
268872f0-5ad9-4915-ac09-ef8404f9953c	2024-12-25 13:50:31.104	gulam	208	pending	2024-12-25 13:50:32.821	2024-12-25 13:50:32.821
\.


--
-- Data for Name: SalesOrderItem; Type: TABLE DATA; Schema: public; Owner: sampleuser
--

COPY public."SalesOrderItem" (id, sales_order_id, product_id, quantity, unit_price, total_price, created_at, updated_at) FROM stdin;
d393eb1d-2438-4195-a9d0-c6040d1d8233	52d54fa3-b2e6-41cc-9356-21adcbf7188d	d38a6f5d-1bf4-495c-ba0b-1145eca2ad5e	6	100	600	2024-12-25 12:53:12.379	2024-12-25 12:53:12.379
4259c46a-64a0-4fa7-aae2-c4ec5126e776	78a33083-bf68-46a7-a07a-e0f872159c3a	d38a6f5d-1bf4-495c-ba0b-1145eca2ad5e	1	100	100	2024-12-25 13:33:12.037	2024-12-25 13:33:12.037
97507bc6-a339-4552-877f-5c99c6023192	78a33083-bf68-46a7-a07a-e0f872159c3a	97b2fc7d-1171-4e01-8e11-b26c21b59988	2	100	200	2024-12-25 13:33:12.037	2024-12-25 13:33:12.037
4f57071e-d14d-48c1-aa95-812df127d1fc	c025a956-ffb9-40b5-a89d-1477c19164fa	590a1ed6-c7f1-4451-9bf0-d130b830da52	1	4	100	2024-12-25 13:44:37.282	2024-12-25 13:44:37.282
16a8ee6c-9dca-4e57-8ada-0cef321bb81d	c025a956-ffb9-40b5-a89d-1477c19164fa	97b2fc7d-1171-4e01-8e11-b26c21b59988	2	100	200	2024-12-25 13:44:37.282	2024-12-25 13:44:37.282
96749dcb-bc41-4fa4-a47d-9ad0d08172fd	268872f0-5ad9-4915-ac09-ef8404f9953c	590a1ed6-c7f1-4451-9bf0-d130b830da52	2	4	8	2024-12-25 13:50:32.821	2024-12-25 13:50:32.821
7ee54928-f0ce-4038-9005-d6a33bb92092	268872f0-5ad9-4915-ac09-ef8404f9953c	97b2fc7d-1171-4e01-8e11-b26c21b59988	2	100	200	2024-12-25 13:50:32.821	2024-12-25 13:50:32.821
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: sampleuser
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
b79cda28-bb09-4fc5-a87b-1774382f1430	9f999aad353f0b7b19483127b05e2003a2c15b0681c44f249ce66bfd38a21494	2024-12-25 17:40:02.190307+05:30	20241225121002_update_sales_order_and_product_relationships	\N	\N	2024-12-25 17:40:02.168705+05:30	1
\.


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: sampleuser
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: SalesOrderItem SalesOrderItem_pkey; Type: CONSTRAINT; Schema: public; Owner: sampleuser
--

ALTER TABLE ONLY public."SalesOrderItem"
    ADD CONSTRAINT "SalesOrderItem_pkey" PRIMARY KEY (id);


--
-- Name: SalesOrder SalesOrder_pkey; Type: CONSTRAINT; Schema: public; Owner: sampleuser
--

ALTER TABLE ONLY public."SalesOrder"
    ADD CONSTRAINT "SalesOrder_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: sampleuser
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: SalesOrderItem SalesOrderItem_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sampleuser
--

ALTER TABLE ONLY public."SalesOrderItem"
    ADD CONSTRAINT "SalesOrderItem_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SalesOrderItem SalesOrderItem_sales_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sampleuser
--

ALTER TABLE ONLY public."SalesOrderItem"
    ADD CONSTRAINT "SalesOrderItem_sales_order_id_fkey" FOREIGN KEY (sales_order_id) REFERENCES public."SalesOrder"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: sampleuser
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

