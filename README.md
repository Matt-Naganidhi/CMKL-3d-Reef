# CMKL-3d-Reef
CMKL URD 201 undergraduate project



# AiCE Undergraduate Research Project
Final Report
 
Fall 2023 Semester
 
#  3D Coral Reef Reconstruction
 
Team Members
 Sarutch Supaibulpipat (Pokpong)
Matt Naganidhi (Matt)
Natha Kunakorn (Jayger)
Settawut Chaithurdthum (Ten)
Sivakorn Phromsiri (Focus)
Advisor
Dr. Boonyarit Changaival
 
November 28, 2023
# Table of Contents
 

Chapter 1: Introduction

1.1 Problem statement
1.2 Project solution approach
1.3 Project objectives

Chapter 2: Background

2.1 Fundamental theory and concepts
2.2 Technologies
2.3 Related research

Chapter 3: Methodology

3.1 Model implementation
3.2 Data collection
3.3 COLMAP software development
3.4 website design and development

Chapter 4: Results

4.1 DeblurNeRF
4.2 Instant NGP
4.3 Application UI

Chapter 5: Conclusions

5.1 Summary of accomplishments
5.2 Issues and obstacles
5.3 Future directions
5.4 Lessons learned



# Glossary:
Multi Layer Perceptron (MLP): Feed forward Neural Network with fully connected neurons
Frustum (Oxford languages Definition): “the portion of a cone or pyramid which remains after its upper part has been cut off by a plane parallel to its base, or which is intercepted between two such planes.”
Midas resolution: variable that determines the level of detail of the depth map
BatchNorm (Batch Normalization): a neural network layer within the hidden layer that
Super Sampling: a method of rendering an image at higher resolutions before averaging the color to determine the new individual pixels.


Chapter 1
# Introduction

Atollkey is a hospitality business in Maldives where they provide a full immersive experience to cater to all clients, either relaxing or more adventurous activities. As part of the local businesses, the owner of Atollkey is set to contribute back to the community and would like to create educational opportunities for both locals and tourists while making an impact in conservation efforts. The grand scheme would be to have an educational platform where tourists can learn more about Maldives and its ecology while creating jobs and educating locals with technology for sustainable development. Focusing on the pressing issue of global warming and coastal health, coral reef is the focus for this project.
In this project, the focus is on the monitoring tasks where the cost is currently very high due to manual and tedious processes. The traditional monitoring process is called transect method where divers are required to mark out each coral reef individually. There is also another method called Photogrammetry which is a 3D reconstruction from various images from many different angles. It requires an elaborated planning of angles and coordinating these angles is not an easy task underwater. Photogrammetry is an advancement and enables larger scale monitoring, but it comes with a high expertise threshold and specialized equipment. Hence, this project’s goal is to introduce AI powered automation for 3D reconstruction bundled as a user friendly application. Yielding increased accessibility and ease of use.
1.1 Problem Statement
Traditional coral reef surveying methods are a labor-intensive process as they require inspection in person, consuming time and personnel. Our objective is to introduce AI and computer vision as a more efficient substitute. This can be done by improving on contemporary photogrammetry methods, which are currently both expensive and computationally demanding with the ultimate goal of reducing the cost of coral reef monitoring. Additionally, maintaining or enhancing the effectiveness can provide educational opportunities to the local community and tourists. 

	Enhancing the effectiveness and analysis capabilities of coral reef monitoring would provide important data to help preserve and maintain coral reef welfare. With improved conditions, an improved monitoring system could slow down the reclining of marine ecosystems. Transect-based methods like line intercept transect (LIT) and point count transect (PCT) do not provide high enough resolution to capture the biodiversity of the coral reef (Roberts et al., 2016). For example, LIT can only capture 56 colonies out of 600 (9.33%) and somewhere between 88.08 and 112.51 colonies out of 600 for PCT (14.68% - 18.75%), and the researchers had to wait 189 minutes to get the result. A different study at the reefs surrounding Reunion Island compares on-site LIT with 3 methods assisted by photogrammetry, one of which is LIT on the reef’s orthomosaic (output of a photogrammetry method). The results of 2 LIT methods provided only 1 descriptor while the other 2 provided 4 and 8 descriptors (Urbina-Barreto et al., 2021). This shows the potential of photogrammetry techniques in gathering much more explicative data and possibly increasing the quality of analyses.

However, some photogrammetry methods currently in use consume significantly more time than traditional methods. The report by the same study at reunion island illustrates this disadvantage: 


Method
Man-days per site (interval)
Analyses on orthomosaics and DEM
5.8–10.3 
Photoquadrats from orthomosaics
5.6–6.1
LIT on orthomosaics
5.4–5.9 
LIT in situ 
2.4


Adapted from Urbina-Barreto et al. (2021)

This poses a need to refine photogrammetry methods if it is to be a definite improvement to existing prevalent methods. Therefore, we have also explored the possibility of using Neural Radiance Fields (NeRF) as well. Some variations of NeRF (NeRF-SLAM, 2022) have been able to generate 3 dimensional representations of objects based on 2d images in real time and in superior detail compared to more primitive photogrammetry and transect methods.
 
1.2 Project Solution Approach
Our solution is a video to 3D construction application that simplifies the processes for the users, all the while leveraging the prowess of NeRF’s bleeding edge techniques and algorithms. With the reduction in usage complexity, our application will be accessible by a wide range of people coming from different backgrounds not limited to only experts in the field. Our wish is that our application will become a helpful tool for coral monitoring and attracting the attention of the masses and sparking interest in the protection and preservation of corals and its ecosystem.

The NeRF algorithm used is a product of relentless searching and testing multiple variations until finally settling upon the best fit for our purposes. The criteria for the best algorithm have mainly revolved around the quality of the 3D construction, but there are many other important considerations such as the processing time, computation load, and stability.

As for the user interface, the focus of the design is to keep it minimal. Adding elements only when it enhances the navigability and coherence of the application. Only after those factors are reviewed do we decide the aesthetics. This makes the usage clear and intuitive. 


1.3 Project Objectives
Our project will encompass the following stages:
Research and Analysis: Conduct an in-depth review of existing NERF techniques and identify areas for improvement in the state-of-the-arts
Algorithm Optimization: Use python to optimize and test existing algorithms to reduce computational resource requirements and improve cost-effectiveness
Implementation and Testing: Implement the chosen NeRF method in a controlled environment and evaluate its performance.
User Interface Design: Design a user-friendly interface for both tourists and locals to engage with the monitoring process.

Chapter 2
# Background

2.1 Fundamental Theory and Concepts
2.1.1 Feature detection and matching
Feature matching and detection are major concepts in 3D model construction from 2D images. Feature detection is the analysis of a set of images, and finding distinctive points that are easily identifiable. These features are used to establish correspondences between different points of views. Examples of these features include: Edges, corners, imperfections (blurs and blobs), etc.
Once features are detected, the correspondences between varying points of view are calculated and then placed in a 3D environment. Matching these features take into account lighting, viewing point, and occlusions.
2.1.2 Structure From Motion (SFM)
Structure from motion abbreviated as SFM is an algorithm that approximates: (1) the location of points in a 3D scene and (2) the camera motion, it’s position and orientation at each image; given limited data from a set common points in a sequence of images. Common points essentially refers to the projection of 3D points observed on each image. The first step is estimating the motion of the camera in other words facing direction and position of each image. For the first pair of images relative pose estimation is applied, which only describes the pose change of 2 images relative to one another. This is followed by absolute pose estimation for the remaining images. This relates all the image poses relative to a global coordinate. It is essential that they share the same coordinate system to compute the predicted position of the 3D points using triangulation from 2D points corresponding image pose. With that a sparse point reconstruction is complete, however it can still be optimized to mitigate inaccuracies stemming from noisy inputs. A popular technique for optimizing the reconstruction is bundle adjustment. The algorithm seeks to minimize the discrepancies between the reprojection of the estimated 3D point and the actual projection on each image by tweaking the image poses and the position of points.
2.1.3 Multi-View Stereo (MVS)
Multi-View Stereo, or MVS for short, is a computer vision technique used to generate 3D models of objects from 2D image inputs of varying angles. The main premise of MVS is analyzing different images and finding matching feature points. Then, those points are triangulated and placed in a 3D environment. Repeating this process with all the input images will generate a dense 3D point cloud (in essence, the skeleton of the model). COLMAP, a main component of Neural Radiance Fields, utilizes both SFM and MVS to calculate camera positions and feature points of a scene.
2.1.4 NeRF: NeRF or Neural Radiance Fields 
NeRF is a type of neural network that learns to understand how light interacts with objects in a scene. It focuses on capturing the intricate details of how light reflects off surfaces and reaches our eyes. NeRF takes in a set of 2D images of an object or a scene from different viewpoints. The neural network then analyzes these images and learns the complex relationships between the 3D structure of the scene and the appearance of the object from various angles. Each point in the 3D scene is associated with a "radiance" value, composed of the color and the opacity values, representing how much light is emitted or reflected at that point. This radiance information is crucial for creating realistic renderings, as it considers the complex interplay of light and materials. NeRF utilizes a technique called "ray marching" during the rendering process. When you want to generate a new view of the scene, NeRF traces rays from the virtual camera through each pixel in the image plane. These rays pass through the 3D scene, and NeRF calculates the color and intensity of light along each ray. During training, NeRF learns to predict the radiance values for each point in 3D space based on the input images. It adjusts its internal parameters through a process called backpropagation, where it minimizes the difference between its predictions and the actual radiance values observed in the training images. The final result is a function that renders views of the 3D scene beyond just the original views from the dataset, but also novel views.

2.1.5 Data collection
To collect a great diversity of datasets for testing. The main tool is a gopro camera. The collected scenes from both underwater and on-land settings, and distinct subjects from each set together displaying a range of properties. We have film objects from the size of a thumb to an adult person and objects with different opacity, reflective behaviors, and textures. This is then used to evaluate the performance of the NeRF algorithms. 




2.2 Technologies
2.2.1 Instant NGP
Müller (2022) explains that unlike the regular NeRF model, this variant of NeRF developed by Nvidia turns NeRF into a hashmap-like voxel structure to help speed up NeRF and optimize it to maximize the usage of GPU cache. Furthermore, the researchers also used Signed distance functions (SDFs) a mathematical function that’s been previously used to find the shortest distance between a point and a surface but the researchers utilized it to shrink the size of the model instead. From our experiment, the fully trained model (which stores the information of the scene) is only 34.8MBs in size while the raw data is 320MBs. This means that instant NGP also has the potential use case as a compression algorithm as well.

The downloadable version of Instant NGP relies on Colmap for estimating the prediction of the camera’s coordinates based on the sequence of images. Although separating this process from NeRF helps with speeding up the training process, it makes the user have to manually input a sequence of commands to preprocess the data before it can be entered into the actual Instant NGP model.


2.2.2 Neuralangelo
Neuralangelo is a framework for high-fidelity 3D surface reconstruction from RGB video captures. Using ubiquitous mobile devices, we enable users to create digital twins of both object-centric and large-scale real-world scenes with highly detailed 3D geometry. Which combines the representation power of multi-resolution 3D hash grids with neural surface rendering. Two key ingredients enable our approach: (1) numerical gradients for computing higher-order derivatives as a smoothing operation and (2) coarse-to-fine optimization on the hash grids controlling different levels of details. Even without auxiliary inputs such as depth, Neuralangelo can effectively recover dense 3D surface structures from multi-view images with fidelity significantly surpassing previous methods, enabling detailed large-scale scene reconstruction from RGB video captures.

2.2.3 SeaThruNeRF
SeaThruNeRF is an underwater imaging technique that improves upon Neural Radiance Fields (NeRF) to enhance the clarity and quality of underwater scenes. It addresses the challenges of underwater photography, such as light absorption and scattering, by utilizing advanced algorithms to reconstruct detailed and visually appealing 3D models from limited and imperfect underwater data. SeaThruNeRF aims to improve the visibility and accuracy of underwater imagery, making it a valuable tool for applications such as marine research, underwater exploration, and monitoring aquatic environments.

2.2.4 Deblur NeRF
Deblur-NeRF is the first method of NeRF that can make a clear model from blurry pictures. Deblur-NeRF works by pretending to blur pictures in the same way they got blurry in the first place. The main part of this  artificial blurring process is the Deformable Sparse Kernel (DSK) module. This module shapes blurry parts differently at different spots, like how things look blurry in various places. It copies the way things really blur in the world. The DSK module is like a smart computer program that can be good at different types of blur. By adjusting both NeRF and the DSK module at the same time, we can make a clear NeRF model.
Libraries and requirements
DeblurNeRF: DeblurNeRF, same as other NeRF, utilizes a large set of libraries and modules. Listed here are the main libraries that are crucial to this process: 
Python 
Numpy: Library used for arrays, matrices, and linear algebra
Scikit-image: Library with algorithms for image processing
Torch and torchvision: Library within pytorch used for image processing
Imageio and imageio-ffmpeg: Library used read and write image data
Matplotlib: An extension of numpy, this library is used to create data visualizations such as scatter plots and bar plots
TensorboardX: An open source toolkit used to display the training process for the user
OpenCV: Library used for computer vision tasks such as landmark detection and object tracking

 2.2.5 COLMAP
COLMAP is a general-purpose Structure-from-Motion (SfM) and Multi-View Stereo (MVS) pipeline. It improves upon the previous method that had to independently look for pixels with very similar colors that only change in a pattern that follows a uniform distribution. By leveraging statistics to construct a likelihood function instead of assuming a uniform distribution, COLMAP can further optimize the performance compared to the previous PatchMatch based joint view selection and depthmap estimation method [8]. COLMAP also takes advantage of how closer objects appear to move faster than objects that are further away in the scene to model how the depth of the intersection of the ray of the current pixel with the local surface of the previous pixel propagates over time.

2.3 Related Research
2.3.1 Existing solutions for monitoring coral reefs
The study described in Jokiel (2015) is conducted in the Archipelago of Hawaii, and compares nine coral census methods commonly used in the region in measuring coral coverage. Each method is tested on 10 coral reef sites. These methods as the paper labels them are:
Quadrat
A type of belt transect: The method of using a quadrat, a square frame with evenly divided hollow square sections, to approximate the area inhabited by each species along a straight path guided by a transect line. This method is a variant that measures the area with the width of the quadrant (1m) across the length of the transect line (25m). An area of 25m. The quadrat used covers an area of 1m2 and is partitioned into 100 subsquares each 0.01m2 or 10cm x 10cm in dimensions.
Random
This method also makes use of quadrat like the first method. The key difference is that this method samples parts of the area along the transect line instead of the entire area along the transect line. The sampling is done at random for both the position adjacent to the transect line and the sections of the square used.
Point Intercept Transect (PIT)
Point intercept transect sample points at regular intervals on the transect line, recording the species at each point. As for the deployment, the method is performed on 2 different transect lines per site, a sum of 50m. With points sampled every 50cm, a cumulative of 102 points.
CRAMP RAT (Coral Reef Assessment and Monitoring Program Rapid Assessment Technique)
CRAMP RAT analyzes 20 non-overlapping photos taken along a 10 meter transect line. 50 points are then sampled from each image, a grand total of 1000 points.
Video transect
Video transect gathers images from a video recording of the reef along the 2 transect lines, in the same manner as the PIT, from directly above. Then curates photos of different areas for evaluation.
Towed-diver
Like video transect the data gathered is in the form of a video with the addition of the videographer towed at a speed of about 0.8m/s.
Photoquad (Photographic Transect)
The photoquad uses quadrats like the classic belt transect (quad method), but uses photography as a means of recording data.
Estimate
This method as the name says pure estimation based purely on the observation of a veteran survey conductor along the transect line and its proximity of 2.5m to either side of the line.
NOAA ground truth
The initial step in conducting this method is to select a survey location using stratified sampling. Once the location is picked a skilled observer examines the surrounding area within a 7m radius from the starting point of each location. This method has extremely imprecise measurements. Results are one of four categories: none, low, medium, and high.
The results of the study show a decrease in survey time of techniques assisted by technological equipment, i.e. cameras, when compared to their traditional counterparts. For example, take the quadrat method and photoquad method. The novel method consumes 25% less time on site than the classical method. Despite reduced time on fieldwork, the total time spent to produce results of the novel methods is still greater. This is due to the computationally intensive process of analyzing a large volume of data. This advantage is also noted in Sufuan (2015). This study compares the video transect method, the Coral Video Transect (CVT), and the line intercept method (LIT), which is similar to PIT. The study concludes that CVT can be conducted at a rate 2 twice the speed of the LIT while collecting more coral features.
All of the noted methods do not make use of technologies or techniques that involve computer vision or 3D modeling that are found in state of the art techniques such as neural radiance field, abbreviated as NeRF. We aim to leverage these technologies in to provide 

Method
Equipment
Data record
Transect length
Number of samples per site
Points per sample
Approx. area  (m2)
Survey time (min)
Lab analysis (min)
Spreadsheet data entry (min)
Total time (min)
Equipment cost (US Dollars)
Quadrat
1 m2 quadrat, writing slate
in situ
25 m
25
100
25
20
0
5
25
$20
Random
transect line 1 m2 quadrat, writing slate
in situ
25 m
5
25
5
15
15
1
31
$20
Point Intercept (PIT)
transect line, writing slate
in situ
two 25 m lines
2
51
50
20
0
5
25
$20
CRAMP RAT
transect line digital camera, PhotoGrid Software
Lab. Computer System
10 m
20
50
20
15
40
10
65
$700
Video
transect line video camera, D/V Raptor, CPCe Software
Lab. Computer System
two 25 m lines
34–47
50
50
5
65
5
75
$1,500
Towed-diver
digital camera, Sigma Scan software, tow-board system.
Lab. Computer System
approx. one image per 25 m
3
50
3
3
5
5
13
$2,500
Photo-quad
transect line 1 m2 photoquad, camera
Lab. Computer System or Projector
25 m
25
100
25
15
35
5
55
$700
Estimate
transect line, writing slate
in situ
25 m
1
estimated range
25
3
0
1
4
$2
NOAA Ground Truth
writing slate
in situ
7 m radius
1
estimated range
154
3
0
1
4
$2


In terms of species identification the aid of equipment doesn’t have a noticeable impact on the amount discerned. Rather the number of species has a high positive correlation with the time it takes to perform the survey.



Since the coral reefs provide particular difficulties for data gathering, time constraints and location accessibility make effectiveness critical. Furthermore, we need to figure out a new method instead of the traditional transect method, which is the line intercept transects (LIT), one of the most popular approaches, are not well adapted to issues requiring the identification of unusual occurrences or species. Moreover, there is another traditional method, which is the point count transect (PCT). The PCT involves counting the number of coral colonies at several sample locations spaced regularly along a transect. Whereas, the LIT keeps track of the percentage of each species found along a transect tape of a specific length. However, to compare the estimates of species richness between the two approaches, the exact location was surveyed using both PCT and LIT. Out of the two techniques LIT is proven to be less effective than PCT, which offers a more precise evaluation of the local-scale species richness. In addition, 41 of the 44 additional species recorded by the PCT occurred 3 or fewer times, demonstrating the increased capacity of PCT to detect rare species. However, both of the methods still fail to capture the details required to accurately predict the number of coral reef colonies. For example, LIT can only capture 56 colonies out of 600 (9.33%) and somewhere between 88.08 and 112.51 colonies out of 600 for PCT (14.68% - 18.75%), and the researchers had to wait 189 minutes to get the result. A different study at the reefs surrounding Reunion Island compares on-site LIT with 3 methods assisted by photogrammetry, one of which is LIT on the reef’s orthomosaic (output of a photogrammetry method). The results of 2 LIT methods provided a measurement of only 1 coral attribute while the other 2 provided 4 and 8 attributes (Urbina-Barreto et al., 2021). This shows the potential of photogrammetry techniques in gathering much more explicative data and possibly increasing the quality of analyses.



Fig 1: PCT sampling scheme (Roberts et al., 2016)
As I explained briefly about traditional methods, I will expand more in detail about these two conventional methods. For studying coral reefs, the line intercept transect (LIT), which was developed from terrestrial vegetation research, has been frequently employed. In this procedure, a transect line is laid along a reef for a certain length, and each species is identified along with the length it takes up under the line. By the way, the LIT is particularly suited for examining temporal or regional patterns in species abundances since it offers an accurate estimate of abundance (i.e. coral cover and density). However, LITs are not appropriate for all ecological questions or locations. For instance, LITs are impracticable in depths > 15 m because it takes so long to perform a sufficient number of duplicate 10 m transects (usually 5), below which safe bottom times for divers become severely restricting variables for SCUBA-based surveys. Besides, the low quantity of replication accomplished may also undersample uncommon and accidental species or occurrences due to the time needed to complete 10 m LITs. Consequently,  LITs are limited in their application according to the habitat and ill-equipped to address questions that require detecting rare events or species.


Fig 2: Species Accumulation Curves For PCT And LIT (by individuals added) (Roberts et al., 2016)


Fig 3: Species Accumulation Curves For PCT And LIT (by time invested). (Roberts et al., 2016)
However,  the PCT was developed to assess patterns of species richness and meta-community structure along steep environmental gradients (e.g., depth) on coral reefs. These research questions do not require metrics of absolute abundance, such as coral cover, which can be effectively obtained using LITs. As a result, the PCT represents a complementary data collection technique rather than a replacement. The sensitivity of the PCT to rare and incidental species allows insight into the poor detection by the LIT but emphasizes rapid capture of richness at the expense of absolute abundance measures. Using the PCT without considering its own strengths and weaknesses for a specific research question will likely result in an equally erroneous result as misuse of the LIT. Where detecting rare species is essential, we propose the PCT as a robust and time-efficient method of collecting ecological data on coral reefs. This method will be particularly effective for examining questions such as depth-diversity gradients, where the amount of survey time is greatly restricted. While this protocol was tested in a highly species-rich habitat with high coral abundance, it applies to any environment. The flexibility of the methodological framework allows for adjustment to specific systems and questions.

2.3.2 Photogrammetry and Using GoPros for SFM
Photogrammetry in recent years has emerged as a part of very beneficial technology in the study of coral reefs, by giving a tool that allows marine biologists and researchers to assess and monitor the health and structure of these ecosystems. In basic terms, the type of photogrammetry used is called underwater photogrammetry, which involves using specialized water cameras to capture high-resolution images of the coral reefs from multiple different angles. The images are then processed with photogrammetry software to generate detailed 3D models and maps of the coral formation. This allows the scientists to quantify the dimensions and volumes of the coral structure while also keeping track of the coral reef’s health and detecting any devastating events or coral diseases. As a result of comparing the 3D models over time, researchers and scientists can gain insights into the growth rates of multiple coral species, assess the impact of environmental stressors, and develop the strategies needed for reef conservation and restoration. 
The application of using Photogrammetry in coral reef research extends beyond scientific analysis, as it additionally plays an important role in raising awareness about the fragility of coral reef ecosystems. The 3D models and images generated through photogrammetry can be used for educational purposes and tourism to illustrate the importance of coral reefs for the ocean ecosystem. Furthermore, photogrammetry can help marine biologists by providing accurate baseline data and helping organizations know which areas are prioritized to be protected.
There are a few different types of software that can be used for underwater photogrammetry:
Agisoft Metashape: a commonly used software specifically for photogrammetry which can be used in underwater scenarios. The software allows the user to be able to create precisely accurate 3D models and orthomosaics from underwater images and photographs. The algorithm that Agisoft Metashape uses is called PhotoScan workflow and the individual processing steps include


Pix4D: allows users to map and model situations with photogrammetry techniques which can be adapted for underwater situations.
Most research in the marine environment field requires the use of professional equipment and specialized methodologies, which reduces the speed and output of such results. This problem in other scientific fields utilizes citizen science to gather help from the public. However, citizen science can be difficult to employ in the marine field, as much of it needs professional equipment. This is where the utilization of GoPros proves to be advantageous.
A process called structure from motion (SFM) is used to estimate the shape of a 3D object using a series of 2D images. Usually, SFM requires photos (such as GPS tagged images) and then aligns them to create a 3D point map. Once this process is repeated enough for a dense 3D map, a mesh is then created between the points to create an approximate model of the structure/environment. This process is a type of photogrammetry most commonly used in the robotics field. Furthermore, it requires cameras in the upper echelons of quality and price. Luckily, cheaper high-megapixel cameras have been more readily accessible lately, and this means that SFM can be used for more diverse fields such as biology.
One study involves deploying citizen scientists along with off site SFM methods to sample marine environments using strip transects (Raoult​ et al., 2016). One of the equipment in use is the GoPro camera. A coral reef flat was to be mapped and compared to traditional snorkel survey methods. The differences in these factors were used to compare the two methods: organism biodiversity, coral biodiversity, holothurians (sea cucumbers), applicability to use with the CoralWatch reef surveying program, time taken, and rate of learning of methodology by citizen scientists.
As a result of this study, a GoPro proves itself viable in mapping a simple orthomosaic. However, the mean benthic (sea floor organism) diversity captured by traditional scuba surveying methods generally provides more detailed mapping. In terms of surveyed area rather than details, the GoPro and photogrammetry method does not show much difference from traditional methods. When it comes to holothurian observations, the GoPro was slightly less effective; not to a significant degree. Visually, the GoPro seems to display darker colors, possibly making it hard to distinguish between light healthy corals and dark deceased corals. Finally, in terms of speed, the GoPro demonstrated superior performance. In general, it took less time to complete than the snorkel transects; especially under 10 transects. However, both methods’ time gradually reached the same tangent at approximately 17 transects.
The GoPro provides results almost as good as traditional methods, with just slightly lower numbers. It does, however, prove to be faster. Along with being less labor intensive, easier to use, and needing fewer people, GoPros can be a viable choice in mapping marine environments.

2.3.3 Other variations of NeRF:
2.3.3.1 NeRF, SLAM, and dense SLAM:
NeRF SLAM is a combination of monocular simultaneous localization and mapping (SLAM) with Neural Radiance Fields (NeRF). To put it simply, SLAM is a computer vision technique that uses one camera to determine its own location and map the area around it as it moves around. This is achieved through the camera tracking specific visual features during its movement and estimating its location. These features include corners, edges, key points, textural patterns, and distinct points of color changes. Dense SLAM, specifically, works similar to traditional SLAM. The aim of dense SLAM is to create a detailed 3D mapping of an environment in real time. While traditional SLAM uses visual features in its mapping, dense SLAM generates a 3D point cloud model.
One setback of the NeRF technique is that it heavily relies on camera positioning and poses. The processing of data to get camera poses for an image can take up a lot of time. Eliminating this task by any means would drastically reduce the time taken for 3D model generation. To achieve this, more NeRF and computer vision techniques must be utilized. The first variation is iNeRF, which proves the possibility of predicting camera poses from previous NeRF models. In addition to that, Barf (bundle-adjusting neural radiance fields) might be able to assist in training NeRFs from imperfect or unknown camera poses. Barf uses an iterative image alignment approach to approximate a camera position, even when an initial estimation is inaccurate. Additional algorithms such as the iMap (Implicit Mapping and Positioning in Real-Time) and Nice-SLAM can possibly rid the camera positioning problem as a whole. These two algorithms use partial decoupling of the poses and depth estimation to construct 3D models. Ultimately, they make 3D model constructions less reliant on camera poses with the cost of time taken.
The process of using NeRF SLAM together mostly consists of gathering data from dense SLAM for 3D mapping data. Then, a NeRF model can be trained using said data. Because of the accuracy of dense SLAM data, the NeRF model training will be improved significantly compared to traditional methods. And because dense SLAM is a real-time process, it is possible that the output 3D model can be generated in real-time as well.

2.3.3.2 Mip-NeRF:
As discussed in the previous section, NeRF uses rays and position encoding to help turn 2d images to 3d ones. However, rays can cause the final scene to have lots of aliasing artifacts or  blurry outputs. Since it’s inefficient to query and MLP frequently while rendering rays, Mip NeRF as stated by Barron (2021) approximates the position encoding on the frustum (a pyramid or cone with the top cut off at an angle parallel to the base) this allows the use of integrated positional encoding which represents volumes instead of the regular NeRF’s position encodings which is represented by multiple points on a line. 
Furthermore, Mip-NeRF also combines the previously separate coarse and fine MLPs into one multiscale MLP which causes the size of the model to be reduced by 50% and speeds up the training and evaluation time.




2.3.3.3 Zip NeRF:
As Barron (2023) describes it, Zip NeRF is a variation of NeRF that combines the techniques used in Mip NeRF and Instant NGP to allow for the rays to be divided into frustums and augmentation of MLPs to store data in grid-like voxels while being able to perform anti-aliasing operations on the output. The researchers had to apply a Gaussian blur to the discrete ID signal of the NeRF histogram in order to make it continuous. This allowed for the model to learn how to apply anti-aliasing effects to the scene. The combination of these methods allowed for the errors of the models to be reduced by 55%- 77% compared to the other methods.
Scale Factor
1
1
1
2
2
2
4
4
4
8
8
8


Error Metric
PSNR
SSIM
LPIPS
PSNR
SSIM
LPIPS
PSNR
SSIM
LPIPS
PSNR
SSIM
LPIPS
Time (hrs)
Instant NGP
24.36
0.642
0.366
25.23
0.712
0.251
26.84
0.809
0.142.
28.42
0.877
0.092
0.15
Mip NeRF 360
27.51
0.779
0.254
29.19
0.864
0.136
30.45
0.912
0.077
30.86
0.931
0.058
21.86
Mip 360 + iNGP
26.46
0.773
0.253
27.92
0.855
0.141
27.67
0.866
0.116
25.58
0.804
0.160
0.31
Zip NeRF
28.25
0.822
0.198
30.00
0.892
0.099
31.57
0.933
0.056
32.52
0.954
0.037
0.90


2.3.4 Stable diffusion’s controlNet: 
Since diffusion models such as Dall E, Midjourney, and Stable Diffusion can create images based on other images or text prompts but unlike NeRF methods, there are lots of inconsistencies between each generation due to random noise. ControlNet is a neural network architecture that allows the output of the diffusion models to be controlled or constrained to a certain shape or criteria ControlNet contains a lot of models, one of them called Depth could convert a single image into a depth map representation so there’s lots of potential for further application of this technology for constructing 3d models of coral reefs for reefs with limited datasets (Zhang et al., 2023). However, in order to have an accurate depth map, the Midas resolution must be high, and as the Midas resolution grows, so does the computational resource and time required to generate the depth map.

Instruct NeRF2NeRF explained by Haque (2019), allows for re-stylization of NeRF scenes and this can open up significantly more use cases for education and help visualize things that might not be feasible to capture with camera (before and after scene of corals dying from global warming) but the researchers didn’t use ControlNet in their NeRF2NeRF model. As a result, they encountered problems with consistency such as “double faces on added objects”, and “ large inconsistencies that our method fails to consolidate in 3D” which could be reduced by using ControlNet.


2.3.5 Potentially Applicable Hardware:
2.3.5.1 Computer:
Analog computers allow for in-memory processing which could allow for more efficient neural networks computation. However, most analog computers introduce a lot of noise. According to Tsai (2020),  we can correct for the distortion caused by the noise by using BatchNorm and account for the instability caused by the fluctuations in the supply voltage, and defects in the manufacturing processes. To account for this, the researchers trained the AI model using analog computer noise. They said that it’s unrealistic to assume that we’ll have prior knowledge of the noise in practice, however, the trained model can adapt to different noise scales without needing any retraining of the model.

2.3.5.2 Camera
Since it is difficult for divers to carefully capture pictures of coral reefs up close and the surrounding water could potentially distort the image captured from the camera, we need a method to upscale the images being used to train our NeRF model in order for us to obtain a high-quality NeRF scene output. We can use SuperSampling as a way to upscale our images and push the limit of the quality of the generated NeRF scene beyond what was originally captured (Wang et al., 2021). They had to split the pixels in the training set into an s  s grid. Unfortunately, the researchers ended up with insufficient subpixels so they had to patch up missing pixels using a refinement convolutional neural network to hallucinate new details for the scene.




2.3.6 3D Gaussian splatting
3D Gaussian splatting is a technique that improves upon NeRF with claims of better quality output and faster training time than iNGP. The researchers use a rasterization technique which converts the 3D scene back into a 2D representation for the user to view on a 2D screen. Instead of using radiance fields like in NeRF, they use 3D gaussian to approximate the values of the radiance field instead. (which is a 3 dimensional version of the bell shaped curve) Just like in NeRF, it relies on the data of COLMAP and the sparse cloud from SfM (structure from motion) Even Though NeRF tries to optimize the scene by having a coarse model and a fine model to minimize the resource allocated to a different space, it is still inefficient and causes lots of artifacts within the scene that reduces the quality of the output and the performance of the output. 3D Gaussian splatting’s use of 3D gaussians allow for these gaussian shapes to be split into different sizes and represent the scene with a bunch of gaussian geometric shapes that fills the empty areas. If a gaussian is too big or too small then it can be adjusted to better represent the scene. During the rasterization process they use a tile-based rendering to avoid having to render individual pixels and only gaussians with 99% confidence intervals which intersect with the view frustum (3d cone/pyramid-like structure that represents the areas of the 3D scene that might be rendered to the screen) are kept (Kerbl et al., n.d.).
During the training of NeRF, we’ve encountered several issues related to movement which caused NeRF and SfM or structure from motion to be confused since it assumes that the object in the scene aren’t moving and the only thing that’s changing over time is the camera positions and the camera angles. There’s a varian of gaussian splatting that addresses that issue (Luiten et al., 2023). The researchers limiting each gaussian to move in a certain way (rigid body transform) but that comes with limitations so the researchers assigned 3 different losses: regularization losses, short-term local-rigidity, and local-rotation similarity. This allows for an accurate tracking of rotation when trying to track the change in 3d dense clouds. The researchers also limits 2 of the 3 loss to be tracked over only 1 time step inorder to keep the distance between 2 gaussians to be the same and not positions (which allows for movement) Although dynamic 3D gaussian enables tracking of movement which could have potential applications for capturing certain corals and seaweeds that could be easily moved with the waves, there are certain limitations such as if an object appears in the scene that wasn’t there in the beginning (For example: a fish swimming by) then it would likely fail to construct the new object that entered the scene but the method still holds lots of potential improvements both in terms of available use cases and visual quality compared to NeRF.

Chapter 3
# Methodology
 
3.1 Model implementation
Implementing NeRF for underwater scenes involves unique challenges due to the distinct characteristics of underwater environments, such as color distortion, and varying levels of visibility. Due to this many NeRF models suffer a drop in precision in data sampled from underwater scenes, which they were not designed for. To adapt NeRF for such scenarios, several modifications and considerations are necessary. Firstly, the model must be able to account for the varying visibility levels in underwater scenes. Additionally, the training of the NeRF model needs adjustments to handle the color and light distortion caused by water. One such variation of NeRF called SeaThru-NeRF was engineered to account for such conditions. Unfortunately, a series of issues in the setup has prevented us from utilizing its potential. Details to the issues are explained in the issues section of this report. Furthermore, the dataset collection must account for underwater conditions, capturing images and corresponding depth information that represent the scene accurately. Given the difficulties in gathering data underwater, data acquisition may involve specialized equipment or techniques to capture images at different depths and distances, such as cameras with greater sensitivity to light and stabilizing equipment for it. Overall, implementing NeRF for underwater scenes demands a tailored approach in dataset collection and preprocessing, together with an underwater compliant algorithm to effectively handle the challenges posed by underwater environments and generate realistic 3D reconstructions despite the complexities of light interaction and visibility in water.

3.2 Data collection
We have collected a great diversity of datasets for testing. The main tool is a gopro camera. The collected scenes from both underwater and on-land settings, and distinct subjects from each set together displaying a range of properties. We have film objects from the size of a thumb to an adult person and objects with different opacity, reflective behaviors, and textures. This is then used to evaluate the performance of the NeRF algorithms. 

3.3 COLMAP software development
The COLMAP software varies between different NeRF variations. For DeblurNeRF, for example, it requires an external COLMAP GUI to generate files for NeRF. These include binary files for camera positions and such. However, Instant NGP has its own COLMAP system in its files. Instant NGP’s COLMAP generates a transformations.json file for NeRF, unlike Deblur. This difference in files despite being the same process, COLMAP, is likely due to the differences in the output. 
Despite the differences in COLMAP output files, they all serve the same purpose nonetheless. These files serve as a skeleton for NeRF to wrap its textures on to provide a higher detail model. In both NeRF variations, the COLMAP output files are combined in the same folder as the original image dataset. These are then put into the NeRF algorithm for final model generation. NeRFs cannot be run without COLMAP, as it is a needed dependency, No matter what variation, the camera positions and scene interest points must be generated by COLMAP first before being fed into the final training and rendering process.

3.4 website design and development
How we designed our web application prototype was from discussion with the team and figuring out, what we should have in our web application, we found that we should have three sections in the web application which consists of the upload video/image page that when the user uploaded it will have a button video preview that will navigate to the video preview page to ensure that the user wants to use the thing they uploaded from 2D version to generate a 3D model in the model preview page. Finally, in the model preview page will be a 3D construction model that will convert from the user’s object, which is 2D that they uploaded to a 3D and the user can review their model in this page.
For the web application, we're using WIX.com to design and create our web application prototype for the real-world web application for a 3D construction model.

Chapter 4
# Results
 
4.1 DeblurNeRF


The rendered model from DeblurNeRF is quite blurry and low quality in general. This is due to the significant hardware limitations. The quality of the input images has been set to a lower quality version just for the program to output a result.
What we have done so far for the results were the same as summary of accomplishments, as we already mentioned as we already successfully installed and trained the NeRF such as De-Blur NeRF and Instance NGP NeRF (INGP) as it was our goals since the beginning of the project. Furthermore, we already have a web application prototype that we designed for the real-world application usable platform.
Since many 2D to 3D conversion technologies relies on COLMAP to run,  and many commands are required to run, COLMAP inorder to get the final result, we’ve also developed a simple software to automate the process by automatically generating a chain of commands so we can just paste whats being generated straight into anaconda prompt and wait for the results.

4.2 Instant NGP
For iNGP, we experimented with several augmented data of the same scene to see how the difference in input effects the result. From the observation of the differences between the 2, we’ve found out that distortion seems to be significantly amplified in the output. By slightly blurring the input video, the output 3D scene resulted in an exaggerated version of the blur. Furthermore, we tried feeding the data with the distorted lens as an input and although there wasn’t much trouble with the 2D snapshot/image of the scene, the model struggles to smoothly transition between 1 angle to another without outputting extreme distortion


Finally, we went snorkeling and gathered real world data from real corals. Since we don’t have the scuba diving experience, skills, or equipment, we’re only limited to snorkeling on the surface of the water which means that the data we can gather is only limited to the top down view with slight variations. Unfortunately, due to the swimming fins getting in the scene of the GoPro when turning, we are limited to gathering data from a straight line which limits the quality of the output. Furthermore, there’s color distortion where the deeper the corals are, the more blue-ish green tint it has which makes it not possible to color correct for all depths since we can only change the white balance of the camera to match one of the layers (corals above would appear too purple-ish red/orange while the corals underneath would appear too blue-ish green). However, this gives a potential for an alternative way to determine the depth of the 3D scene based on 2D images where a modified version of COLMAP and NeRF could allow for the color tint to be a determining factor.







4.3 Application UI
Here’s our web application prototype design by using WIX.com. Basically, there are three pages, which consist of the upload video/Image page, the video preview page, and the model preview page.
This is the upload video/image page, this page will let the user upload the video/image that the user wants to convert 2D model to 3D model. After the user uploaded the file, there is a video preview button at the bottom of the file upload box for the user to click and recheck the file that they already uploaded in the model preview page


This is a video preview page, it will let the user check the video that they uploaded before generating the 3D model, when the user already checked a video/image, then they can click the generate model button. So it will navigate to the model preview page after the converting processes by NeRF.


Here’s the final page, which is a model preview page, so this page will show a 3D model after it passed the converting processes by NeRF. Finally, it will show a 3D model and the user can preview it as what they want to see.


Chapter 5
# Conclusions
 
5.1 Summary of Accomplishments
           We’ve successfully installed and trained multiple variations of NeRF such as De-Blur NeRF and Instance NGP (INGP). The results have had varying quality levels depending on the size of the training data and the quality of the input data, but nonetheless, it was progress that can be built upon. Moreover, we already have a web application prototype for how our web application looks and the methodology to use it as well. However, Basically, the things we have done so far might be applied in further development in the next semester to be the actual platform for 3D construction for coral reefs due to the things we have right now.
 
5.2 Issues and Obstacles
No, we didn’t accomplish all of the goals we set at the beginning, since there were some obstacles like Neuralangelo because we couldn’t make it to generate a 3D model due to the problem of setting up the COLMAP,  and Neuralangelo itself. So that’s why we couldn’t be able to get Neuralangelo’s NeRF 3D model result. In fact, setting up the environments for each NeRF variation had proven to be a challenge in itself. For example, one of the NeRF variations with major set-up problems was SeaThruNeRF. A lot of the libraries required to set up SeaThru contain a lot of problems. For instance, the Jaxlib library that is required is the version that is discontinued. When trying with older versions, it causes incompatibility issues with other existing libraries. Changing the Jaxlib library requires a change in the Jax module too. However, the new required Jax module is unsupported within the project. This issue with module and library versions persists with many requirements too, causing a huge inconvenience. When pursuing this constant change of versions, it seems to cause more problems than solve any. Due to this, it was unfortunate that such a convenient NeRF variation had to be discarded from the project. 
Furthermore, we’ve also encountered several data handling issues that cause low quality or unsatisfactory output, especially in underwater scenes where the waves caused by the camera moving in the water could cause the image captured to be distorted and that could mess up COLMAPs interpretation of the distance of the object in a 3D scene. NeRF and COLMAP require precise and clear images to perform training with. Any data that is incomplete or has a slight imperfection will cause the result to become distorted extremely. For example, Deblur NeRF also had a handful of data handling issues. Sets of data that were working perfectly on other models were rendering NaN values on DeblurNeRF. Luckily, this problem has only occurred for specific datasets, though it is still unknown what the root of the problem is. 
Limitations of NeRF and the machine it’s used to run at present to be a big issue, especially with Deblur NeRF. The results of this NeRF variation on its GitHub page showed high-quality renders, even from a blurry set of data. However, the developers used a V100 GPU with 32GB memory to achieve this. Since our team does not have access to a GPU like that, there was an issue of resource limitation. The GPU on the computer where DeblurNeRF was run on only had 8GB of memory. Initially, the program did not run at all. To troubleshoot this, the parameters were changed. This resulted in a lower-quality model, but the program ran nonetheless. Still, the training process took multiple hours, which was not optimal. Decreasing the number of iterations though, did decrease the training time and barely affected the model quality. Additionally, DeblurNeRF was specifically designed for front-facing data, only constructing models in a 180 degree matter, not 360. This limitation decreases the usefulness of the model.
For the coral data gathering process, it is extremely difficult to dive down to film around the corals and the environment has lots of potential risk like the existence of sea urchins which made getting closer to the shallower corals more difficult and dangerous (the waves can cause unintended collisions with the sea urchin spikes). For the slightly deeper corals, we’ve encountered a different issue where the corals are far away which caused the data to have color correction issues and more deeper water tend to result in both a reduction in detail and an increase in color distortion (deeper corals tend to shift towards a darker blue-ish green color)

5.3  Future Directions
5.3.1 Problem statement for future directions:
In the process of training NeRF, we’ve found out that the most time consuming process is during the use of COLMAP  to extract the relative camera positions within the scene and users often run into issues (Schonberger et al., 2016b) (qingjiuling, 2020). This incentives us to minimize the use of COLMAP so that we minimize the computing time and encounters of errors. Furthermore, the quality of the output of the NeRF model can only be evaluated by the loss graph while training and visual inspection and there’s no clear way to determine the correlation between the input data and the final output 3D scene. The only way that’s available so far is to rely on the theoretical knowledge of the properties of the model and video distortions. However, the application of regression models to find correlations between how the input influences the output of the model could make the process of debugging and distortion removal easier for the user.It could also find the correlation and estimate the recommended number of image input to feed into COLMAP based on computer specifications.
5.3.2 Methodology for future directions:
By introducing the option to use gyro and accelerometer data to be used in combination with calculating the change in pixels, we can increase the accuracy and narrow down the possibilities of potential camera angles and positions in a much quicker time. Despite that, gyro data and accelerometers can sometimes be inaccurate. That is why instead of taking the exact number as the deterministic value, we can feed in the data into a neural network to minimize the error (Gao et al., 2022). Then model the output with a probability distribution around a given position before feeding that value into COLMAP for more accurate context around the change in pixel values. With awareness of gyrometer and acceleration data, this will also allow COLMAP to be more robust when encountering video of objects that move across different frames since it can now also rely on the positional data rather than just the observation of the change in pixel synthesized from the set of images.
For underwater related applications, we can take advantage of the property of how the color shifts towards a dark blue-ish green color to help COLMAP determine the depth and direction of the scene. Currently COLMAP is capable of determining the camera angle and position of the scene relative to each other but it doesn’t truly know which direction is truly up or down but with the calculation from the color-shift caused by the increase in density of water light has to travel through at deeper levels, we can approximate the true direction of the camera orientation which could help save post processing time and allow for more accurate and informative output. By leveraging the change in hue, coral experts can determine from the 3D scene how deep each part of the scene is relative to sea level.
We can also use regression to predict the number of frames COLMAP can handle given a limited computing resource. For the use of regression analysis on predicting the number of input images that COLMAP can handle based on individual computing systems, we have to take multiple variables into consideration like the change in angle between frames over time, the specification of the GPU, CPU, and RAM, etc. inorder to determine how much of the video input we should use and the frequency of the extracted image frames. Since we’re going to choose a subset of images from a set of images in an input video, this means that we’ll have to choose to drop certain images and inorder to determine which images to keep or which images to drop, we can use Next best view selection which chooses images that could see the most triangulated points(Schonberger et al., 2016a) to minimize the probability of error.

5.3.3 Data Gathering for future directions:
We might have to start off by manually doing trial and error experiments by running COLMAP on different computer systems while increasing the number of input data until it starts throwing in an error. It is very important that COLMAP is the only process running on the computer so that the computer’s processing power is guaranteed to be dedicated entirely to COLMAP. We can then record the number of input sizes just before COLMAP throws an error. We can then use high dimensional regression (that way we can fit in lots of variables so it also captures the change through more complex hidden features) and we can reduce the computation resource required for that by computing it in parallel (Wu et al., 2023). We can then estimate to fit a to the data set so that we can get a better estimate of how the increase in computing power correlates with the maximum number of inputs.
Since trial and error could be a time consuming process, we can adapt the binary search algorithm (this specific part/binary search is used to efficiently determine the number of images in the data set and not for downsampling or finding the effects of input on the NeRF output) to speed up the process by getting the number of frames in a video and sample every other frame from that video to get half of the amount and try running COLMAP to see if the output throws an error or not, if it does then we could assume that the number of frames is too high and half it and if it doesn’t then we can assume it’s too low and add another half of the current amount to the current amount of frames. Since a variety of factors can contribute to COLMAP throwing an error, we need to check for and distinguish between different types of error before we can automatically perform the described process.(Williams, 1976)

5.3.4 Potential NeRF and Colmap Improvement:
We can use cross validation among the output json file and through RLHF and high dimensional regression, we can determine which image correlates the most with higher output quality which would make the data gathering process more efficient and the quality of the results to be more quantifiable (Zvornicanin, 2023).
Since we’ll have to individually map how the 3D scene with 4 dimensions of variables (red, green, blue, and opacity) correlates to the 5 dimensional input and the context of the surrounding pixels, if we’re going to use a regression method to find the correlation, we must compute it in parallel we can then use another layer of high dimensional regression with Elastic-net regularization to increase sparsity in the model and allow it handle more variables while only keeping the features that best correlates with each other (Wu et al., 2023). This helps reduce the number of variables the regression model has to deal with.
By using cross validation in the NeRF model trained with different subsets of data and measuring the loss value, we can determine which image contributes towards an increase in loss value and remove it. Cross validating the training in NeRF could also potentially allow us to remove random noise that’s generated arbitrarily by different NeRF training runs as well or by cutting out random blobs that appear in some iterations but there might be a tradeoff between detail and model accuracy since certain details at certain angles might be accidentally removed due to as well. Since certain variations of NeRF relies on statistical estimations or a stochastic method, this makes it harder to determine the contribution of individual frames to the quality of the final output but we could either freeze the noise or represent the random variable with the most probable value instead. (Shen et al., 2021)
In conclusion, there are several methods to implement regression to potentially improve the experience of training NeRF and using Colmap. By incorporating gyro and accelerometer data to refine camera position estimates, and employing high-dimensional regression to predict optimal frame processing capacities based on specific computing resources, we have notably modeled a method to potentially enhance the efficiency and accuracy of these systems and the user experience training them. Furthermore, the application of cross-validation in NeRF training, coupled with Elastic-net regularization in regression modeling, provides a potential for the improvement in precision and quality of the output while managing the complexity of multiple variables. These applications of regression could hold the potential to offer a more robust, efficient, and explainable approach to training NeRF and other 2D-3D methods that relies on COLMAP. The potential for future work includes further refinement of these models and exploring their applicability in broader scenarios within this dynamic and evolving field.

5.4 Lessons Learned
One of the most important things we’ve learned is to keep going no matter how many errors we’ve faced or no matter how many problems we’ve encountered, we need to remind ourselves that the result is sometimes out of our control and the best thing we can do is to solve the problem that causes the misalignment between what we expect the model to behave and iterate through ideas on what we can do to fix the problem.
Here’s more details about what we have learned about our project during this semester:
Library versions must be exactly as listed in the NeRFs’ Githubs. A slight change in versions can cause the whole code to not run.
3D construction heavily relies on data, down to every frame and pixel of it. Complications in resolution or picture quality will have noticeable setbacks in the final render (if it even is able to render at all)
The whole process of 3D construction takes a lot of time and computing power. The final renders of Deblur NeRF took 2-3 hours of training and yet still very low quality due to low GPU memory and for iNGP, it can take several days on larger data sets (COLMAP seems to scale exponentially)

# References
Barron, J. T., Mildenhall, B., Tancik, M., Hedman, P., Martin-Brualla, R., & Srinivasan, P. P. (2021, March 24). Mip-NeRF: A Multiscale Representation for Anti-Aliasing Neural Radiance Fields. arXiv. Retrieved October 1, 2023, from https://arxiv.org/abs/2103.13415
Barron, J. T., Mildenhall, B., Verbin, D., Srinivasan, P. P., & Hedman, P. (2023, April 13). Zip-NeRF: Anti-Aliased Grid-Based Neural Radiance Fields. arXiv. Retrieved October 1, 2023, from https://arxiv.org/abs/2304.06706
Gao, Y., Shi, D., Li, R., Liu, Z., &amp; Sun, W. (2023). Gyro-net: IMU gyroscopes random errors compensation method based on Deep Learning. IEEE Robotics and Automation Letters, 8(3), 1471–1478. https://doi.org/10.1109/lra.2022.3230594 
Haque, A., Tancik, M., Efros, A. A., Holynski, A., & Kanazawa, A. (2019, June 24). Instruct-NeRF2NeRF: Editing 3D Scenes with Instructions. arXiv. Retrieved October 1, 2023, from https://arxiv.org/abs/2303.12789
Jokiel, P. L., Rodgers, K. S., Brown, E. K., Kenyon, J. C., Aeby, G., Smith, W. R., & Farrell, F. (2015, May 12). Comparison of methods used to estimate coral cover in the Hawaiian islands. PeerJ. 10.7717/peerj.954
Kerbl, B., Kopanas, G., Leimkuehler, T., &amp; Drettakis, G. (2023). 3d Gaussian splatting for real-time radiance field rendering. ACM Transactions on Graphics, 42(4), 1–14. https://doi.org/10.1145/3592433 
Luiten, J., Kopanas, G., Leibe, B., & Ramanan, D. (2023). Dynamic 3D Gaussians: Tracking by Persistent Dynamic View Synthesis. ArXiv, abs/2308.09713.
Ma, D. (2007). The business model of “software-as-A-service.” IEEE International Conference on Services Computing (SCC 2007). https://doi.org/10.1109/scc.2007.118 
Mildenhall, B., Srinivasan, P. P., Tancik, M., Barron, J. T., Ramamoorthi, R., & Ng, R. (2020). Nerf: Representing scenes as neural radiance fields for view synthesis. Computer Vision – ECCV 2020, 405–421. https://doi.org/10.1007/978-3-030-58452-8_24 
Mildenhall, B., Srinivasan, P. P., Tancik, M., Barron, J. T., Ramamoorthi, R., & Ng, R. (2020, March 19). NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis. arXiv. Retrieved October 1, 2023, from https://arxiv.org/abs/2003.08934
Mittal, A. (2023, April 20). Neural radiance fields: Past, present, and future. arXiv.org. https://arxiv.org/abs/2304.10050 
Müller, T., Evans, A., Schied, C., & Keller, A. (2022, May 4). Instant Neural Graphics Primitives with a Multiresolution Hash Encoding. arXiv. Retrieved October 2, 2023, from https://arxiv.org/abs/2201.05989
Raoult​, V., David, P. A., Dupont, S. F., Mathewson, C. P., O’Neill, S. J., Powell, N. N., & Williamson, J. E. (2016, April 25,). GoPros™ as an underwater photogrammetry tool for citizen science. PeerJ. https://peerj.com/articles/1960/
Roberts, T. E., Bridge, T. C., Caley, M. J., & Baird, A. H. (2016, March 24). The Point Count Transect Method for Estimates of Biodiversity on Coral Reefs: Improving the Sampling of Rare Species. PLoS ONE. https://doi.org/10.1371/journal.pone.0152335
Rosinol, A., Leonard, J. J., & Carlone, L. (2022, October 24). NeRF-SLAM: Real-Time Dense Monocular SLAM with Neural Radiance Fields. arXiv. Retrieved October 1, 2023, from https://arxiv.org/abs/2210.13641
Safuan, M., Boo, W. H., Siang, H. Y., Chark, L. H., & Bachok, Z. (2015, October 7). Optimization of Coral Video Transect Technique for Coral Reef Survey: Comparison with Intercept Transect Technique. Scientific Research Publishing. http://dx.doi.org/10.4236/ojms.2015.54031
Schonberger, J. L., &amp; Frahm, J.-M. (2016a). Structure-from-motion revisited. 2016 IEEE Conference on Computer Vision and Pattern Recognition (CVPR). https://doi.org/10.1109/cvpr.2016.445 
Schönberger, J. L., Zheng, E., Frahm, J.-M., &amp; Pollefeys, M. (2016b). Pixelwise view selection for unstructured multi-view stereo. Computer Vision – ECCV 2016, 501–518. https://doi.org/10.1007/978-3-319-46487-9_31 
Shen, J., Ruiz, A., Agudo, A., &amp; Moreno-Noguer, F. (2021). Stochastic neural radiance fields: Quantifying uncertainty in implicit 3D representations. 2021 International Conference on 3D Vision (3DV). https://doi.org/10.1109/3dv53792.2021.00105
Tsai, L.-H., Chang, S.-C., Chen, Y.-T., Pan, J.-Y., Wei, W., & Juan, D.-C. (2020, July 7). Robust Processing-In-Memory Neural Networks via Noise-Aware Normalization. arXiv. Retrieved October 1, 2023, from https://arxiv.org/abs/2007.03230
Urbina-Barreto, I., Garnier, R., Elise, S., Pinel, R., Dumas, P., Mahamadaly, V., Facon, M., Bureau, S., Peignon, C., Quod, J.-P., Dutrieux, E., Penin, L., & Adjeroud, M. (2021, May 24). Which Method for Which Purpose? A Comparison of Line Intercept Transect and Underwater Photogrammetry Methods for Coral Reef Surveys. Frontiers in Marine Science, 8. https://doi.org/10.3389/fmars.2021.636902
Wang, C., Wu, X., Guo, Y.-C., Zhang, S.-H., Tai, Y.-W., & Hu, S.-M. (2021, December 3). NeRF-SR: High-Quality Neural Radiance Fields using Supersampling. arXiv. Retrieved October 1, 2023, from https://arxiv.org/abs/2112.01759
Wang, C., Wu, X., Guo, Y.-C., Zhang, S.-H., Tai, Y.-W., &amp; Hu, S.-M. (2022). Nerf-SR: High quality neural radiance fields using supersampling. Proceedings of the 30th ACM International Conference on Multimedia. https://doi.org/10.1145/3503161.3547808 
Williams, L. F. (1976). A modification to the half-interval search (binary search) method. Proceedings of the 14th Annual Southeast Regional Conference on&nbsp;  - ACM-SE 14. https://doi.org/10.1145/503561.503582 
Wu, X., Zhang, Z., &amp; Cui, Z. (2023, November 21). A unified consensus-based parallel ADMM algorithm for high-dimensional regression with combined regularizations. arXiv.org. https://arxiv.org/abs/2311.12319 
Zhang, L., Rao, A., & Agrawala, M. (2023, September 2). Adding Conditional Control to Text-to-Image Diffusion Models. arXiv. https://arxiv.org/abs/2302.05543
Zheng, E., Dunn, E., Jojic, V., &amp; Frahm, J.-M. (2014). Patchmatch based Joint View Selection and Depthmap estimation. 2014 IEEE Conference on Computer Vision and Pattern Recognition. https://doi.org/10.1109/cvpr.2014.196 
Zvornicanin, E. (2023, March 24). How to use K-fold cross-validation in a neural network?. Baeldung on Computer Science. https://www.baeldung.com/cs/k-fold-cross-validation 
qingjiuling. (2022, November 26). Use colmap as a library problem [Online forum post]. GitHub. https://github.com/colmap/colmap/issues/1065

