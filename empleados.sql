-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-07-2024 a las 06:31:43
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `empleados`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `nombres` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `correo_electronico` varchar(255) NOT NULL,
  `dni` varchar(20) NOT NULL,
  `edad` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `telefono` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `nombres`, `apellidos`, `direccion`, `correo_electronico`, `dni`, `edad`, `fecha_creacion`, `telefono`) VALUES
(1, 'Juan Carlos', 'Pérez López', 'Calle 123, Ciudad de México', 'juan.perez@example.com', '12345678MX', 30, '2024-07-09 04:14:12', '555-1234'),
(2, 'María Guadalupe', 'García Hernández', 'Av. Reforma 456, Ciudad de México', 'maria.garcia@example.com', '23456789MX', 25, '2024-07-09 04:14:12', '555-5678'),
(3, 'José Luis', 'Rodríguez Martínez', 'Calle 789, Guadalajara', 'jose.rodriguez@example.com', '34567890MX', 28, '2024-07-09 04:14:12', '333-1234'),
(4, 'Ana Sofía', 'López Gómez', 'Calle 321, Monterrey', 'ana.lopez@example.com', '45678901MX', 32, '2024-07-09 04:14:12', '818-5678'),
(5, 'Luis Fernando', 'Hernández Díaz', 'Av. Juárez 654, Puebla', 'luis.hernandez@example.com', '56789012MX', 27, '2024-07-09 04:14:12', '222-1234'),
(6, 'Karla Paola', 'Martínez Sánchez', 'Calle 987, Toluca', 'karla.martinez@example.com', '67890123MX', 26, '2024-07-09 04:14:12', '722-5678'),
(7, 'Miguel Ángel', 'Gómez Flores', 'Av. Insurgentes 111, Querétaro', 'miguel.gomez@example.com', '78901234MX', 29, '2024-07-09 04:14:12', '442-1234'),
(8, 'Laura Elena', 'Sánchez Ramírez', 'Calle 654, Mérida', 'laura.sanchez@example.com', '89012345MX', 31, '2024-07-09 04:14:12', '999-5678'),
(9, 'Alejandro Javier', 'Díaz Ortiz', 'Av. Universidad 222, Tijuana', 'alejandro.diaz@example.com', '90123456MX', 33, '2024-07-09 04:14:12', '664-1234'),
(10, 'Claudia Isabel', 'Ortiz Morales', 'Calle 333, León', 'claudia.ortiz@example.com', '01234567MX', 24, '2024-07-09 04:14:12', '477-5678');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo_electronico` (`correo_electronico`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `telefono` (`telefono`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
