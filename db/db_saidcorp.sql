-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-01-2018 a las 17:32:24
-- Versión del servidor: 10.1.26-MariaDB
-- Versión de PHP: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: db_saidcorp
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_attendancecontrol` (IN `id_attendancecontrol` INT)  BEGIN
	DELETE FROM dba_attendancecontrol
	WHERE IDAttendancecontrol = id_attendancecontrol;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_attendancecontrol` (IN `v_name` VARCHAR(150), IN `v_fechai` DATE, IN `v_fechaf` DATE)  BEGIN
SELECT 	ac.IDAttendancecontrol, CONCAT_WS(' ',e.LastName,e.FirstName) as CompleteName, ac.Type,
				DATE_FORMAT(ac.Day,'%d/%m/%Y') as Day, ac.Hour, m.Description as Motive, ac.Description, ac.Hour_j, ac.FileMotivo
FROM dba_attendancecontrol ac
INNER JOIN dba_employee e ON ac.IDEmployee = e.IDEmployee
LEFT JOIN  dba_motive m ON ac.IDMotivo = m.IDMotivo
WHERE
	CONCAT_WS(' ',e.LastName,e.FirstName) LIKE CONCAT('%',v_name,'%') AND
	ac.Day BETWEEN v_fechai AND v_fechaf
ORDER BY ac.Day, STR_TO_DATE(ac.Hour,'%h:%i %p');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_datos_attendance` ()  BEGIN
	SELECT 1 as Tipo, IDEmployee as ID, CONCAT_WS(' ',LastName,FirstName) as Descripcion FROM dba_employee
	UNION
	SELECT 2, IDMotivo, Description FROM dba_motive
	UNION
	SELECT 3, DATE_FORMAT(CURDATE(),'%d/%m/%Y'), '';
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_employee` ()  BEGIN
	SELECT IDEmployee, CONCAT(LastName,' ',FirstName) as CompleteName, DNI, DATE_FORMAT(DateAdmission,'%d/%m/%Y') as DateAdmission FROM dba_employee;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_timecontrol` (IN `v_name` VARCHAR(150))  BEGIN
	SELECT t.IDEmployee , CONCAT_WS(" ",e.LastName,e.FirstName) as Fullname, t.Datei, t.Datef, t.Tmi, t.Tmf, t.Tti, t.Ttf 
	FROM dba_timecontrol t
	INNER JOIN dba_employee e on e.IDEmployee = t.IDEmployee 
	WHERE CONCAT_WS(' ',e.LastName,e.FirstName) LIKE CONCAT('%',v_name,'%');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_ver_attendancecontrol` (IN `IDAttendancecontrol` INT)  BEGIN
	SELECT a.IDAttendancecontrol, CONCAT_WS(" ",e.LastName, e.FirstName) as Fullname, a.IDMotivo, a.Description, a.Hour_j, a.FileMotivo FROM dba_attendancecontrol a
	INNER JOIN dba_employee e ON e.IDEmployee = a.IDEmployee
	WHERE a.IDAttendancecontrol = IDAttendancecontrol;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_ajustar_attendance` (IN `ID_Employee` INT, IN `v_fechaj` DATE, IN `v_horaj` VARCHAR(8), IN `ID_Motive` INT, IN `v_descripcion` VARCHAR(150))  BEGIN
	DECLARE v_type INT;
	DECLARE v_count INT DEFAULT(0);

	DECLARE ID INT;
	DECLARE done INT DEFAULT FALSE;
  DECLARE mytable CURSOR FOR SELECT a.IDAttendancecontrol FROM dba_attendancecontrol a
															WHERE 
																a.IDEmployee = ID_Employee AND
																a.Day = v_fechaj
															ORDER BY STR_TO_DATE(a.Hour,'%h:%i %p');

  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

	SELECT COUNT(a.IDEmployee) INTO v_type
	FROM dba_attendancecontrol a 
	WHERE 
		a.IDEmployee = ID_Employee AND
		a.Day = v_fechaj;

	INSERT INTO dba_attendancecontrol(
		IDEmployee,
		Day,
		Hour,
		Type,
		IDMotivo,
		Description)
	VALUES(
		ID_Employee,
		v_fechaj, 
		v_horaj, 
		v_type + 1,
		ID_Motive,
		v_descripcion);
	
	OPEN mytable;
  SET v_count = 0;
  myloop: LOOP
    FETCH mytable INTO ID;
    IF done THEN
      LEAVE myloop;
    END IF;
   SET v_count = v_count +1;
    UPDATE dba_attendancecontrol
		SET Type= v_count WHERE IDAttendancecontrol=ID;
  END LOOP;
  CLOSE mytable;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_attendancecontrol` (IN `v_dni` VARCHAR(8))  BEGIN
	DECLARE id_employee INT;
	DECLARE v_type INT;

	SELECT IDEmployee INTO id_employee FROM dba_employee
	WHERE DNI = v_dni;
	--

	SELECT COUNT(a.IDEmployee) INTO v_type
	FROM dba_attendancecontrol a 
	WHERE 
	a.IDEmployee = id_employee AND
	a.Day = CURRENT_DATE;
	-- a.Day = ADDDATE(CURRENT_DATE,INTERVAL 2 DAY);

	--
	INSERT INTO dba_attendancecontrol(
		IDEmployee,
		Day,
		Hour,
		Type)
	VALUES(
		id_employee,
		CURRENT_DATE,
		-- ADDDATE(CURRENT_DATE,INTERVAL 2 DAY), 
		TIME_FORMAT(ADDTIME(CURRENT_TIME,'01:00:00'),'%H:%i:%s'), 
		v_type + 1);
	
	SELECT CONCAT_WS(' ',LastName,FirstName) AS completename FROM dba_employee
	WHERE DNI = v_dni;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_employee` (IN `v_name` VARCHAR(50), IN `v_lastname` VARCHAR(50), IN `v_dni` VARCHAR(8), IN `v_day` DATE)  BEGIN
	INSERT INTO dba_employee (FirstName,LastName,DNI,DateAdmission)
	VALUES (v_name, v_lastname, v_dni, v_day);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_fua` (IN `v_nomrazonsocial` VARCHAR(150), IN `v_dniruc` VARCHAR(11), IN `v_reprelegal` VARCHAR(150), IN `v_dni` VARCHAR(8), IN `v_contacto` VARCHAR(150), IN `v_domicilio` VARCHAR(250), IN `v_telefono` VARCHAR(100), IN `v_correo` VARCHAR(250), IN `v_descripcion` VARCHAR(200), IN `v_observacion` VARCHAR(200))  BEGIN
		DECLARE count_codfua INT DEFAULT(0);
		DECLARE cod_fua VARCHAR(8);
		DECLARE id_fua INT;
		
		SELECT CASE WHEN COUNT(*) = 0 THEN 1 ELSE MAX(f.Codigofua) + 1 END INTO count_codfua
		FROM dba_fua f
		WHERE YEAR(f.Fecha) = YEAR(CURDATE());

		SET cod_fua = CONCAT(LPAD(count_codfua,3,0),' - ',YEAR(CURDATE()));
		
		INSERT INTO dba_fua (CodigoFua, NombreRazonsocial, RucDni, RepresentanteLegal, Dni, Contacto, Domicilio, Telefono, Correo, Fecha)
		VALUES (cod_fua, v_nomrazonsocial, v_dniruc, v_reprelegal, v_dni, v_contacto, v_domicilio, v_telefono, v_correo, CURDATE());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_timecontrol` (IN `ID_Employee` INT, IN `v_ifecha` DATE, IN `v_ffecha` DATE, IN `v_me` TIME, IN `v_ms` TIME, IN `v_te` TIME, IN `v_ts` TIME)  BEGIN
	INSERT INTO dba_timecontrol(IDEmployee,Datei,Datef,Tmi,Tmf,Tti,Ttf)
	VALUES (ID_Employee, v_ifecha, v_ffecha, v_me, v_ms, v_te, v_ts);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_attendancecontrol` (IN `id_attendancecontrol` INT, IN `id_motivo` INT, IN `v_descripcion` VARCHAR(150), IN `v_hourj` TIME, IN `v_file` TEXT)  BEGIN
	UPDATE dba_attendancecontrol a
	SET
	a.IDMotivo = id_motivo,
	a.Description = v_descripcion,
	a.Hour_j = v_hourj,
	a.FileMotivo = v_file
	WHERE a.IDAttendancecontrol = id_attendancecontrol;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla dba_area
--

CREATE TABLE dba_area (
  IDArea int(11) NOT NULL,
  Description varchar(50) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla dba_attendancecontrol
--

CREATE TABLE dba_attendancecontrol (
  IDAttendancecontrol int(11) NOT NULL,
  IDEmployee int(11) DEFAULT NULL,
  Day date DEFAULT NULL,
  Hour time DEFAULT NULL,
  Type char(1) CHARACTER SET utf8 DEFAULT NULL,
  IDMotivo int(11) DEFAULT NULL,
  Description varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  Hour_j time DEFAULT NULL,
  FileMotivo text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla dba_attendancecontrol
--

INSERT INTO dba_attendancecontrol (IDAttendancecontrol, IDEmployee, `Day`, `Hour`, `Type`, IDMotivo, Description, Hour_j, FileMotivo) VALUES
(1, 2, '2017-11-28', '08:35:00', '1', NULL, NULL, NULL, NULL),
(2, 4, '2017-11-29', '08:35:00', '1', NULL, NULL, NULL, NULL),
(3, 9, '2017-11-29', '08:35:00', '3', NULL, NULL, NULL, NULL),
(4, 2, '2017-11-29', '08:35:00', '1', NULL, NULL, NULL, NULL),
(5, 13, '2017-11-29', '08:35:00', '2', NULL, NULL, NULL, NULL),
(6, 9, '2017-11-29', '08:35:00', '4', NULL, NULL, NULL, NULL),
(7, 2, '2017-11-29', '08:35:00', '1', NULL, NULL, NULL, NULL),
(9, 4, '2017-11-30', '12:41:00', '2', NULL, NULL, NULL, NULL),
(10, 9, '2017-11-30', '12:41:00', '2', NULL, NULL, NULL, NULL),
(11, 13, '2017-11-30', '12:41:00', '2', NULL, NULL, NULL, NULL),
(12, 13, '2017-11-30', '12:42:00', '3', NULL, NULL, NULL, NULL),
(15, 7, '2017-11-30', '01:41:00', '2', NULL, NULL, NULL, NULL),
(16, 2, '2017-11-30', '01:41:00', '1', 2, 'asdas', NULL, NULL),
(17, 4, '2017-11-30', '01:48:00', '3', NULL, NULL, NULL, NULL),
(18, 9, '2017-11-30', '01:48:00', '3', NULL, NULL, NULL, NULL),
(19, 9, '2017-11-30', '01:48:00', '4', NULL, NULL, NULL, NULL),
(20, 7, '2017-11-30', '01:48:00', '3', NULL, NULL, NULL, NULL),
(21, 7, '2017-11-30', '01:48:00', '4', NULL, NULL, NULL, NULL),
(25, 2, '2017-11-30', '01:49:00', '2', NULL, NULL, NULL, NULL),
(26, 4, '2017-11-30', '01:49:00', '4', NULL, NULL, NULL, NULL),
(27, 2, '2017-11-28', '05:40:00', '3', NULL, NULL, NULL, NULL),
(29, 2, '2017-11-29', '05:52:00', '1', NULL, NULL, NULL, NULL),
(30, 2, '2017-11-29', '05:52:00', '1', NULL, NULL, NULL, NULL),
(54, 2, '2017-11-28', '01:45:00', '2', 4, 'asdsa', NULL, NULL),
(55, 2, '2017-11-28', '09:45:00', '4', 4, 'asdsa', NULL, NULL),
(56, 9, '2017-11-28', '01:45:00', '1', 4, 'asdsa', NULL, NULL),
(57, 9, '2017-11-29', '01:45:00', '1', 4, 'asdsa', NULL, NULL),
(58, 9, '2017-11-29', '03:45:00', '2', 4, 'asdsa', NULL, NULL),
(59, 13, '2017-11-29', '07:45:00', '1', 4, 'asdsa', NULL, NULL),
(60, 13, '2017-11-30', '07:45:00', '1', 4, 'asdsa', NULL, NULL),
(66, 4, '2017-11-30', '07:52:00', '1', 4, 'sdasd', NULL, NULL),
(67, 9, '2017-11-30', '07:53:00', '1', 4, 'asdasd', NULL, NULL),
(69, 7, '2017-11-30', '07:16:00', '1', 4, 'dfgdsfgdg', NULL, NULL),
(70, 2, '2017-12-05', '07:56:00', '1', NULL, NULL, NULL, NULL),
(71, 2, '2017-12-05', '19:59:05', '2', NULL, NULL, NULL, NULL),
(73, 2, '2017-11-30', '05:17:33', '3', 4, 'Olviddó marcar', NULL, NULL),
(74, 2, '2017-11-30', '22:17:33', '4', 4, 'Olviddó marcar', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla dba_attendancecontrol_total
--

CREATE TABLE dba_attendancecontrol_total (
  IDEmployee int(11) NOT NULL,
  Periodo varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  H_trabajo int(11) DEFAULT NULL,
  H_tardanza int(11) DEFAULT NULL,
  D_trabajo int(11) DEFAULT NULL,
  D_falta int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla dba_department
--

CREATE TABLE dba_department (
  IDDepartment int(11) NOT NULL,
  Description varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  IDDiv int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla dba_division
--

CREATE TABLE dba_division (
  IDDiv int(11) NOT NULL,
  Description varchar(50) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla dba_employee
--

CREATE TABLE dba_employee (
  IDEmployee int(11) NOT NULL,
  LastName varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  FirstName varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  DNI varchar(8) CHARACTER SET utf8 DEFAULT NULL,
  DateAdmission date DEFAULT NULL,
  IDDepartment int(11) DEFAULT NULL,
  IDArea int(11) DEFAULT NULL,
  Barcode varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  ImgEmployee text,
  Estado char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla dba_employee
--

INSERT INTO dba_employee (IDEmployee, LastName, FirstName, DNI, DateAdmission, IDDepartment, IDArea, Barcode, ImgEmployee, Estado) VALUES
(1, 'Cierto Córdova', 'Alejandro', '76956308', '2017-10-03', NULL, NULL, NULL, NULL, '1'),
(2, 'Collao Díaz', 'Sergio Bryam', '71743884', '2017-09-30', NULL, NULL, NULL, NULL, '1'),
(3, 'García León', 'Marisol Stefany', '71065677', '2016-09-26', NULL, NULL, NULL, NULL, '1'),
(4, 'Gonzales Trebejo', 'Cinthia Vanessa', '43308628', '2014-09-01', NULL, NULL, NULL, NULL, '1'),
(5, 'Huanca Ochoa', 'Mirella', '76700335', '2017-10-09', NULL, NULL, NULL, NULL, '1'),
(6, 'Méndez Flores', 'Xiomara Fiorella', '48343237', '2016-09-01', NULL, NULL, NULL, NULL, '1'),
(7, 'Miranda Api', 'Ana María', '72407213', '2016-03-15', NULL, NULL, NULL, NULL, '1'),
(8, 'Quineche Miranda', 'Jhon Antony', '42450702', '2014-07-16', NULL, NULL, NULL, NULL, '1'),
(9, 'Ríos Carrasco', 'Keyla Stefany', '70559536', '2015-07-03', NULL, NULL, NULL, NULL, '1'),
(10, 'Roncal Caro', 'Emilio Enrique', '48068696', '2016-02-05', NULL, NULL, NULL, NULL, '1'),
(11, 'Sare Gonzales', 'Fany Viviana', '41928387', '2017-07-27', NULL, NULL, NULL, NULL, '1'),
(12, 'Trujillo Ripamontti', 'Said Giuliano', '21122364', '2014-07-16', NULL, NULL, NULL, NULL, '1'),
(13, 'Villanueva Llanos', 'Hernando Elio', '71774900', '2016-08-30', NULL, NULL, NULL, NULL, '1'),
(14, 'Yupanqui Cumpa', 'Bryan Scott', '70180823', '2017-10-01', NULL, NULL, NULL, NULL, '1'),
(15, '', '', '', '0000-00-00', NULL, NULL, NULL, NULL, NULL),
(16, '', '', '', '0000-00-00', NULL, NULL, NULL, NULL, NULL),
(17, '', '', '', '0000-00-00', NULL, NULL, NULL, NULL, NULL),
(18, '', '', '', '0000-00-00', NULL, NULL, NULL, NULL, NULL),
(19, '', '', '', '0000-00-00', NULL, NULL, NULL, NULL, NULL),
(20, '', '', '', '0000-00-00', NULL, NULL, NULL, NULL, NULL),
(21, '', '', '', '0000-00-00', NULL, NULL, NULL, NULL, NULL),
(22, '', '', '', '0000-00-00', NULL, NULL, NULL, NULL, NULL),
(23, '', '', '', '0000-00-00', NULL, NULL, NULL, NULL, NULL),
(24, '', '', '', '0000-00-00', NULL, NULL, NULL, NULL, NULL),
(25, '', '', '', '0000-00-00', NULL, NULL, NULL, NULL, NULL),
(26, '', '', '', '0000-00-00', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla dba_fua
--

CREATE TABLE dba_fua (
  IDFua int(11) NOT NULL,
  Codigofua varchar(8) NOT NULL,
  NombreRazonsocial varchar(150) NOT NULL,
  RucDni varchar(11) NOT NULL,
  RepresentanteLegal varchar(150) DEFAULT NULL,
  Dni varchar(8) DEFAULT NULL,
  Contacto varchar(150) DEFAULT NULL,
  Domicilio varchar(250) DEFAULT NULL,
  Telefono varchar(100) DEFAULT NULL,
  Correo varchar(250) DEFAULT NULL,
  Fecha date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla dba_fua
--

INSERT INTO dba_fua (IDFua, Codigofua, NombreRazonsocial, RucDni, RepresentanteLegal, Dni, Contacto, Domicilio, Telefono, Correo, Fecha) VALUES
(1, '001-2018', 'a', '2332', 'a', '2212312', 'b', 'mz, lt', '99999', '@jaja.com', '2018-01-23'),
(2, '002-2018', 'a', '2332', 'a', '2212312', 'b', 'mz, lt', '99999', '@jaja.com', '2018-01-23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla dba_fuadetalles
--

CREATE TABLE dba_fuadetalles (
  IDFuadetalle int(11) NOT NULL,
  IDFua int(11) DEFAULT NULL,
  Descripcion varchar(200) DEFAULT NULL,
  Observacion varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla dba_fuadetalles
--

INSERT INTO dba_fuadetalles (IDFuadetalle, IDFua, Descripcion, Observacion) VALUES
(1, 2, 'jeje', 'jeje2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla dba_fuaretribucion
--

CREATE TABLE dba_fuaretribucion (
  IDFuaretribucion int(11) NOT NULL,
  IDFua int(11) DEFAULT NULL,
  Fecha date DEFAULT NULL,
  Monto int(11) DEFAULT NULL,
  Observacion varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla dba_motive
--

CREATE TABLE dba_motive (
  IDMotivo int(11) NOT NULL,
  Description varchar(150) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla dba_motive
--

INSERT INTO dba_motive (IDMotivo, Description) VALUES
(1, 'Falta'),
(2, 'Suspensión'),
(3, 'Permiso'),
(4, 'Otros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla dba_timecontrol
--

CREATE TABLE dba_timecontrol (
  IDTimecontrol int(11) NOT NULL,
  IDEmployee int(11) DEFAULT NULL,
  Datei date DEFAULT NULL,
  Datef date DEFAULT NULL,
  Tmi time DEFAULT NULL,
  Tmf time DEFAULT NULL,
  Tti time DEFAULT NULL,
  Ttf time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla dba_timecontrol
--

INSERT INTO dba_timecontrol (IDTimecontrol, IDEmployee, Datei, Datef, Tmi, Tmf, Tti, Ttf) VALUES
(1, 2, '2017-12-11', '2017-12-15', '08:00:00', '13:00:00', '15:30:00', '19:00:00'),
(3, 2, '2017-12-11', '2017-12-11', '08:30:00', '13:00:00', '16:00:00', '19:30:00'),
(4, 0, '0000-00-00', '0000-00-00', '19:18:21', '19:18:21', '19:18:21', '19:18:21'),
(5, 0, '0000-00-00', '0000-00-00', '19:18:21', '19:18:21', '19:18:21', '19:18:21'),
(6, 0, '0000-00-00', '0000-00-00', '19:18:21', '19:18:21', '19:18:21', '19:18:21'),
(7, 0, '0000-00-00', '0000-00-00', '19:18:21', '19:18:21', '19:18:21', '19:18:21'),
(8, 0, '2017-12-01', '2017-12-15', '08:00:00', '14:00:00', '15:00:00', '20:00:00'),
(9, 2, '2017-12-01', '2017-12-15', '08:00:00', '13:00:00', '14:00:00', '18:00:00'),
(10, 2, '2017-12-15', '2017-12-31', '08:00:00', '12:00:00', '14:00:00', '19:00:00'),
(11, 2, '2018-01-01', '2018-01-31', '08:00:00', '12:00:00', '15:00:00', '17:00:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla dba_area
--
ALTER TABLE dba_area
  ADD PRIMARY KEY (IDArea);

--
-- Indices de la tabla dba_attendancecontrol
--
ALTER TABLE dba_attendancecontrol
  ADD PRIMARY KEY (IDAttendancecontrol);

--
-- Indices de la tabla dba_department
--
ALTER TABLE dba_department
  ADD PRIMARY KEY (IDDepartment);

--
-- Indices de la tabla dba_division
--
ALTER TABLE dba_division
  ADD PRIMARY KEY (IDDiv);

--
-- Indices de la tabla dba_employee
--
ALTER TABLE dba_employee
  ADD PRIMARY KEY (IDEmployee);

--
-- Indices de la tabla dba_fua
--
ALTER TABLE dba_fua
  ADD PRIMARY KEY (IDFua);

--
-- Indices de la tabla dba_fuadetalles
--
ALTER TABLE dba_fuadetalles
  ADD PRIMARY KEY (IDFuadetalle);

--
-- Indices de la tabla dba_fuaretribucion
--
ALTER TABLE dba_fuaretribucion
  ADD PRIMARY KEY (IDFuaretribucion);

--
-- Indices de la tabla dba_motive
--
ALTER TABLE dba_motive
  ADD PRIMARY KEY (IDMotivo);

--
-- Indices de la tabla dba_timecontrol
--
ALTER TABLE dba_timecontrol
  ADD PRIMARY KEY (IDTimecontrol);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla dba_area
--
ALTER TABLE dba_area
  MODIFY IDArea int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla dba_attendancecontrol
--
ALTER TABLE dba_attendancecontrol
  MODIFY IDAttendancecontrol int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT de la tabla dba_department
--
ALTER TABLE dba_department
  MODIFY IDDepartment int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla dba_division
--
ALTER TABLE dba_division
  MODIFY IDDiv int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla dba_employee
--
ALTER TABLE dba_employee
  MODIFY IDEmployee int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla dba_fua
--
ALTER TABLE dba_fua
  MODIFY IDFua int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla dba_fuadetalles
--
ALTER TABLE dba_fuadetalles
  MODIFY IDFuadetalle int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla dba_fuaretribucion
--
ALTER TABLE dba_fuaretribucion
  MODIFY IDFuaretribucion int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla dba_motive
--
ALTER TABLE dba_motive
  MODIFY IDMotivo int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla dba_timecontrol
--
ALTER TABLE dba_timecontrol
  MODIFY IDTimecontrol int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
