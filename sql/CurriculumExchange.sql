-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2018-01-06 09:54:46
-- 服务器版本： 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `curriculumexchange`
--

-- --------------------------------------------------------

--
-- 表的结构 `assignment`
--

CREATE TABLE `assignment` (
  `id` int(10) NOT NULL,
  `content` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `userid` int(10) NOT NULL,
  `classid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `class`
--

CREATE TABLE `class` (
  `id` int(11) NOT NULL,
  `classname` varchar(20) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `class`
--

INSERT INTO `class` (`id`, `classname`) VALUES
(1, '计算机科学一班'),
(2, '计算机科学二班'),
(3, '商务英语一班'),
(4, '商务英语二班'),
(5, '会计一班'),
(6, '会计二班'),
(7, '会计三班');

-- --------------------------------------------------------

--
-- 表的结构 `curriculum`
--

CREATE TABLE `curriculum` (
  `id` int(10) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `introduce` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `coursescon` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `coursesmet` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `teacherid` int(10) NOT NULL,
  `classid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `curriculum`
--

INSERT INTO `curriculum` (`id`, `name`, `introduce`, `coursescon`, `coursesmet`, `teacherid`, `classid`) VALUES
(1, '数据结构', '《数据结构》作为一门独立的课程最早是美国的一些大学开设的，1968年美国唐·欧·克努特教授开创了数据结构的最初体绻，他所著的《计算机程序设计技巧》第一卷《基本算滕》是第一本较绻统地阐述数据的逻辑结构和存储结构及其操作的著作。从 60年代末到70年代初，出现了大型程序，软件也相对独立，结构程序设计成为程序设计方滕学的主要内容，人们帱越来越重视数据结构，认为程序设计的实质是对确定的问题选择一种好的结构，加上设计一种好的算滕。瑞士计算机科学家，PASCAL之父，结构化程序设计的首创者-----帼克劳斯·溃思（Niklaus Wirth）教授曾指出：算滕+数据结构=程序，认为程序设计的实质是对确定的问题选择一种好的结构，加上设计一种好的算滕。这个公式对计算机科学的影响程度足以繻似物理学中爱因斯坦的“E=MC^ 2”——一个公式幕示出了程序的本质。从70年代中期到80年代初，各种版本的数据结构著作帱相继出现。', '介绍什么是数据结构；基本概念和术语: 数据、数据元素、数据对象，以及数据结构的定义、逻辑结构、物理结构（理解）数据类型、抽象数据类型；抽象数据类型的表示与实现；算法和算法分析: 算法的概念、算法设计的要求以及算法效率的度量。\r\n', '组织和自我组织学习认识活动的方法', 1, 1),
(2, '操作系统', '操作系统是管理计算机硬件的程序，它还为应用程序提供基础，并且充当计算机硬件和计算机用户的中介。大型机的操作系统设计的主要目的是为了充分优化硬件的使用率，个人计算机的操作系统是为了能支持从复杂游戏到商业应用的各种事物，手持计算机的操作系统是为了给用户提供一个可以与计算机方便地交互并执行程序的环境。因此，有的操作系统设计是为了方便，有的设计是为了高效,而有的设计目标则是兼而有之。', '可以从多个角度来研究操作系统。第一是从操作系统所提供的服务方面。第二是通过考察为用户和程序员提供的接口。第三是研究系统的各个组成部分及其相互关系。在本章里，将从用户角度、程序员角度和操作系统设计人员角度来分别研究操作系统的三个方面。本章将研究操作系统提供什么服务、如何提供服务、设计操作系统的各种方法。最后，介绍如何生成操作系统，以及计算机如何启动它的操作系统。', '检查和自我检查教学效果的方法', 3, 1),
(14, 'C语言', 'C语言是一种具有极强生命力的高级程序设计语言。它是理想的结构化语言，描述能力强，已经成为被广泛使用的教学语言；它又被称为“高级语言中的低级语言”，意为既有高级语言又有低级语言的特点，因此C语言既可用来编写应用软件又可用来编写系统软件；和其它的高级程序设计语言相比，C语言极具灵活性，使程序设计人员能有较大的自由度，可适应更宽广的应用领域。  C语言程序设计这门课程是计算机系、电气系、机械系、数理系、生化系、纺服系等系部各专业的系定必修课，通过本课程学习可以使学生掌握结构化程序设计的方法，确立程序设计的思维方式，并为数据结构等后续课程的学习打下基础。', '了解程序设计的基本知识。了解C程序的基本特点、初步知识和构成。掌握指针的定义和使用。掌握结构体和共用体的定义和变量的使用。了解并掌握变量的存储分类、作用域和生存期。了解编译预处理。了解位运算符及运算规律。了解并熟悉文件操作。', '检查和自我检查教学效果的方法', 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `curriculumresources`
--

CREATE TABLE `curriculumresources` (
  `id` int(10) NOT NULL,
  `url` varchar(100) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `forum`
--

CREATE TABLE `forum` (
  `id` int(10) NOT NULL,
  `theme` varchar(100) CHARACTER SET utf8 NOT NULL,
  `content` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `userid` int(10) NOT NULL,
  `usertype` int(10) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `forumreply`
--

CREATE TABLE `forumreply` (
  `id` int(10) NOT NULL,
  `forumid` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `content` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `notice`
--

CREATE TABLE `notice` (
  `id` int(10) NOT NULL,
  `content` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `userid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `student`
--

CREATE TABLE `student` (
  `id` int(10) NOT NULL,
  `username` varchar(20) CHARACTER SET utf8 NOT NULL,
  `password` varchar(20) CHARACTER SET utf8 NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `classid` int(10) NOT NULL,
  `usertype` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `student`
--

INSERT INTO `student` (`id`, `username`, `password`, `name`, `classid`, `usertype`) VALUES
(9, 'mht', '123', '马化腾', 1, 0),
(10, 'my', '123', '马云', 1, 0),
(11, 'lqd', '123', '刘强东', 1, 0);

-- --------------------------------------------------------

--
-- 表的结构 `teacher`
--

CREATE TABLE `teacher` (
  `id` int(10) NOT NULL,
  `username` varchar(20) CHARACTER SET utf8 NOT NULL,
  `password` varchar(20) CHARACTER SET utf8 NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `classid` int(10) NOT NULL,
  `usertype` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `teacher`
--

INSERT INTO `teacher` (`id`, `username`, `password`, `name`, `classid`, `usertype`) VALUES
(1, 'cx', '123', '陈翔', 1, 1),
(2, 'ryf', '123', '阮一峰', 2, 1),
(3, 'lls', '123', '刘老师', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignment`
--
ALTER TABLE `assignment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `curriculum`
--
ALTER TABLE `curriculum`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `curriculumresources`
--
ALTER TABLE `curriculumresources`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forum`
--
ALTER TABLE `forum`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forumreply`
--
ALTER TABLE `forumreply`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notice`
--
ALTER TABLE `notice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `assignment`
--
ALTER TABLE `assignment`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `class`
--
ALTER TABLE `class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- 使用表AUTO_INCREMENT `curriculum`
--
ALTER TABLE `curriculum`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- 使用表AUTO_INCREMENT `curriculumresources`
--
ALTER TABLE `curriculumresources`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `forum`
--
ALTER TABLE `forum`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `forumreply`
--
ALTER TABLE `forumreply`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `notice`
--
ALTER TABLE `notice`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `student`
--
ALTER TABLE `student`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- 使用表AUTO_INCREMENT `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
