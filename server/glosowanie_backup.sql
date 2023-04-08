-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2023 at 11:14 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `glosowanie`
--

-- --------------------------------------------------------

--
-- Table structure for table `glosujacy`
--

CREATE TABLE `glosujacy` (
  `glosujacy_id` int(3) NOT NULL,
  `imie` int(30) NOT NULL,
  `nazwisko` int(50) NOT NULL,
  `kandydat_id` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kandydat`
--

CREATE TABLE `kandydat` (
  `kandydat_id` int(2) NOT NULL,
  `nazwa` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kandydat`
--

INSERT INTO `kandydat` (`kandydat_id`, `nazwa`) VALUES
(1, 'SiP'),
(2, 'OP'),
(3, 'Partia Oddzielnie');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `glosujacy`
--
ALTER TABLE `glosujacy`
  ADD PRIMARY KEY (`glosujacy_id`),
  ADD KEY `kandydat_id` (`kandydat_id`);

--
-- Indexes for table `kandydat`
--
ALTER TABLE `kandydat`
  ADD PRIMARY KEY (`kandydat_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `glosujacy`
--
ALTER TABLE `glosujacy`
  MODIFY `glosujacy_id` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kandydat`
--
ALTER TABLE `kandydat`
  MODIFY `kandydat_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `glosujacy`
--
ALTER TABLE `glosujacy`
  ADD CONSTRAINT `glosujacy_ibfk_1` FOREIGN KEY (`kandydat_id`) REFERENCES `kandydat` (`kandydat_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
