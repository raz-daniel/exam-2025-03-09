-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Mar 03, 2025 at 04:10 PM
-- Server version: 9.2.0
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ShopsDB`
--
CREATE DATABASE IF NOT EXISTS `ShopsDB` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `ShopsDB`;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
('44477859-f848-11ef-9cf5-0242ac110002', 'Electronics', '2025-03-03 15:57:53', '2025-03-03 15:57:53'),
('444ad4d4-f848-11ef-9cf5-0242ac110002', 'Clothing', '2025-03-03 15:57:53', '2025-03-03 15:57:53'),
('444afeec-f848-11ef-9cf5-0242ac110002', 'Groceries', '2025-03-03 15:57:53', '2025-03-03 15:57:53');

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`id`, `name`, `category_id`, `address`, `created_at`, `updated_at`) VALUES
('98b4b705-c81b-45fb-b717-1d0052463da1', 'Fresh Market', '444afeec-f848-11ef-9cf5-0242ac110002', '505 Produce Lane, Portland, OR', '2025-03-03 16:08:07', '2025-03-03 16:08:07'),
('a6cb16dd-f848-11ef-9cf5-0242ac110002', 'Circuit City', '44477859-f848-11ef-9cf5-0242ac110002', '456 Gadget St, San Francisco, CA', '2025-03-03 16:00:39', '2025-03-03 16:00:39'),
('a6cb19a6-f848-11ef-9cf5-0242ac110002', 'Micro Center', '44477859-f848-11ef-9cf5-0242ac110002', '789 Computer Ave, Chicago, IL', '2025-03-03 16:00:39', '2025-03-03 16:00:39'),
('a6cb1a6f-f848-11ef-9cf5-0242ac110002', 'Fry\'s Electronics', '44477859-f848-11ef-9cf5-0242ac110002', '101 Digital Rd, Austin, TX', '2025-03-03 16:00:39', '2025-03-03 16:00:39'),
('a6cb1acc-f848-11ef-9cf5-0242ac110002', 'TechWorld', '44477859-f848-11ef-9cf5-0242ac110002', '202 Innovation Pkwy, Seattle, WA', '2025-03-03 16:00:39', '2025-03-03 16:00:39'),
('e22cf485-f848-11ef-9cf5-0242ac110002', 'Fashion Zone', '444ad4d4-f848-11ef-9cf5-0242ac110002', '303 Style Ave, Miami, FL', '2025-03-03 16:02:18', '2025-03-03 16:02:18'),
('e22d1c84-f848-11ef-9cf5-0242ac110002', 'Trendy Corner', '444ad4d4-f848-11ef-9cf5-0242ac110002', '404 Boutique St, Los Angeles, CA', '2025-03-03 16:02:18', '2025-03-03 16:02:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `stores`
--
ALTER TABLE `stores`
  ADD CONSTRAINT `stores_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
