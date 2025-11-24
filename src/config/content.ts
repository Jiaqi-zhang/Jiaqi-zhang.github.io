/** 
 * content.ts
 *
 * Centralized site content configuration for the researcher homepage.
 * Exports Profile, News, Research, Projects, and Gallery data.
 * This keeps data decoupled from presentation for easy updates.
 */

import type { Profile } from '../components/hero/Hero'
import type { NewsItem } from '../components/news/NewsList'
import type { ResearchWork } from '../components/research/ResearchList'
import type { ProjectItem } from '../components/projects/ProjectsGrid'
import type { GalleryItem } from '../components/gallery/GalleryMosaic'
import type { AffiliationItem } from '../components/affiliations/AffiliationsRow'

/** Profile data used by Hero section (English). */
export const profile: Profile = {
  name: 'Zhang Jia-Qi (张加其)',
  title: 'Ph.D. Candidate',
  affiliation: 'State Key Laboratory of Virtual Reality Technology and Systems, Beihang University (BUAA)',
  location: 'Beijing, China',
  bio: "I am currently a Ph.D. candidate at Beihang University (BUAA), under the supervision of Professor Shimin Hu (胡事民) and <a href='http://miaowang.me/'>Professor Miao Wang (汪淼)</a>. I obtained both my Bachelor's and Master's degrees in Software Engineering from North China Electric Power University, where I was mentored by <a href='https://cce.ncepu.edu.cn/szdw/jsml/rjgcjys/2912c61d37bb491685892ee0c6b2e717.htm'>Professor Su-Qin Wang (王素琴)</a> and <a href='https://cce.ncepu.edu.cn/szdw/jsml/rjgcjys/11887a993a444b23b4af863190aed157.htm'>Professor Min Shi (石敏)</a>. During my Master's program, I also conducted academic research under the guidance of <a href='http://geometrylearning.com/lin/' target='_blank' rel='noopener'>Professor Lin Gao (高林)</a> at the Institute of Computing Technology, Chinese Academy of Sciences.",
  interests: [
    { 
      label: '3D Character Animation', 
      description: 'Text-driven generation of character motions and character-object/scene interactions.' 
    },
    { 
      label: 'Sketch Image Colorization', 
      description: 'Automatic colorization of sketch images or line art videos.' 
    }
  ],
  email: 'zhangjiaqi79@buaa.edu.cn',
  links: {
    scholar: 'https://scholar.google.com/citations?hl=zh-CN&user=a-CCwW8AAAAJ',
    orcid: 'https://orcid.org/0000-0002-8482-3666',
    researchgate: 'https://www.researchgate.net/profile/Zhang-Jia-Qi-2',
    github: 'https://github.com/Jiaqi-zhang',   
    cv: 'https://scholar.google.com/citations?hl=zh-CN&user=a-CCwW8AAAAJ',
  },
  // Prefer a local avatar image; if missing, UI will fallback to a placeholder.
  avatarPath: '/images/avatar.jpg',
  avatarKeyword: 'portrait headshot',
}

/** Profile data used by Hero section (Chinese). */
export const profileZh: Profile = {
  name: '张加其 (Zhang Jia-Qi)', // 或 Dr. Alex Chen
  title: '博士生',
  affiliation: '北京航空航天大学，虚拟现实技术与系统国家重点实验室',
  location: '中国，北京',
  bio: "北京航空航天大学博士研究生在读，导师为胡事民教授与<a href='http://miaowang.me/'>汪淼教授</a>。本科及硕士均毕业于华北电力大学软件工程专业，师从<a href='https://cce.ncepu.edu.cn/szdw/jsml/rjgcjys/2912c61d37bb491685892ee0c6b2e717.htm'>王素琴教授</a>和<a href='https://cce.ncepu.edu.cn/szdw/jsml/rjgcjys/11887a993a444b23b4af863190aed157.htm'>石敏教授</a>。硕士期间，曾在中国科学院计算技术研究所<a href='http://geometrylearning.com/lin/' target='_blank' rel='noopener'>高林教授</a>指导下进行访问研究。",
  interests: [
    { 
      label: '三位角色动画', 
      description: '基于文本驱动的角色动作生成及角色与物体/场景交互生成。' 
    },
    { 
      label: '线稿图像上色', 
      description: '自动为线稿图像或线稿视频上色。' 
    }
  ],
  email: 'zhangjiaqi79@buaa.edu.cn',
  links: {
    scholar: 'https://scholar.google.com/citations?hl=zh-CN&user=a-CCwW8AAAAJ',
    orcid: 'https://orcid.org/0000-0002-8482-3666',
    researchgate: 'https://www.researchgate.net/profile/Zhang-Jia-Qi-2',
    github: 'https://github.com/Jiaqi-zhang',   
    cv: 'https://scholar.google.com/citations?hl=zh-CN&user=a-CCwW8AAAAJ',
  },
  avatarPath: '/images/avatar.jpg',
  avatarKeyword: 'portrait headshot',
}

/** Latest news items shown in the timeline. */
export const news: NewsItem[] = [
  { date: '2025-08-15', title: '2025-08 Our work HyT2M about text to motion is accepted by FCS (CCF B).', link: 'https://journal.hep.com.cn/fcs/EN/10.1007/s11704-025-50904-0' },
  { date: '2025-08-02', title: '2025-08 Our work SHGS about garment simulation is accepted by PG 2025 (CCF B).', link: 'https://onlinelibrary.wiley.com/doi/full/10.1111/cgf.70236' },
  { date: '2024-07-10', title: '2024-07 Our work SMRNet about motion retargeting is accepted by TVCG (CCF A).' },
  { date: '2023-10-10', title: '2023-10 Our work HoughLaneNet is accepted by Computers & Graphics 2023 (CCF C) and received the Best Paper Award.' },
]

/** Selected research works; tags will be aggregated to form filters. */
export const works: ResearchWork[] = [
  {
    id: 'hyt2m',
    imgPath: '/images/works/hyt2m.png',
    title: 'Generative Masked Text-to-Motion Model with Hybrid Vector Quantization',
    authors: "<b><u>Jia-Qi Zhang</u></b>, Jia-Jun Wang, Fang-Lue Zhang, Miao Wang",
    venue: 'Frontiers of Computer Science (FCS, CCF B)',
    year: 2025,
    abstract: 'Text-based motion generation enhances the flexibility of human motion design and editing, enabling applications in animation, virtual reality, and beyond. However, diffusion-based methods for text-to-motion generation often produce low-quality results. Conditional autoregressive approaches leveraging vector quantization variational autoencoders (VQ-VAE) struggle with vector quantization errors, requiring hierarchical or residual quantization. This increases the length of quantized token sequences, forcing the model to predict more tokens from text input, which complicates high-quality generation. To address this, we introduce HyT2M, an innovative text-to-motion model based on a hybrid VQ-VAE framework. Our approach decomposes motion into global and local components: local motion is quantized using a single vector quantization layer to preserve fine details, while global motion is reconstructed via residual vector quantization (RVQ) to compensate for errors caused by the limited perceptual range of local components. This hybrid strategy shortens token sequences while maintaining high reconstruction quality, easing the burden on the second-stage model. Furthermore, we develop a conditional masked transformer with a hybrid cross-guidance module, leveraging global motion tokens to enhance local motion predictions. This improves accuracy and usability for motion editing. Experiments on the HumanML3D, KIT-ML, and Motion-X datasets indicate that HyT2M achieves competitive results and excels in tasks such as motion completion and long-motion generation.',
    tags: ['Animation'],
    imageKeyword: 'ai research abstract visualization',
    links: { paper: 'https://journal.hep.com.cn/fcs/EN/10.1007/s11704-025-50904-0' },
    bibtex: `@article{zhang2025hyt2m,
title = {Generative Masked Text-to-Motion Model with Hybrid Vector Quantization},
journal = {Frontiers of Computer Science},
volume = {},
pages = {-},
year = {},
issn = {2095-2228},
doi = {https://doi.org/10.1007/s11704-025-50904-0},
url = {https://journal.hep.com.cn/fcs/EN/10.1007/s11704-025-50904-0},
author = {},
keywords = {},
abstract = {null}
}`
  },
  {
    id: 'shgs',
    imgPath: '/images/works/shgs.jpg',
    title: 'Self-Supervised Humidity-Controllable Garment Simulation via Capillary Bridge Modeling',
    authors: 'Min Shi, Xin-Ran Wang, <b><u>Jia-Qi Zhang</u></b>, Lin Gao, Deng-Ming Zhu, Hong-Yan Zhang',
    venue: 'Pacific Conference on Computer Graphics and Applications (PG, CCF B)',
    year: 2025,
    abstract: "Simulating wet clothing remains a significant challenge due to the complex physical interactions between moist fabric and the human body, compounded by the lack of dedicated datasets for training data-driven models. Existing self-supervised approaches struggle to capture moisture-induced dynamics such as skin adhesion, anisotropic surface resistance, and non-linear wrinkling, leading to limited accuracy and efficiency. To address this, we present SHGS, a novel self-supervised framework for humidity-controllable clothing simulation grounded in the physical modeling of capillary bridges that form between fabric and skin. We abstract the forces induced by wetness into two physically motivated components: a normal adhesive force derived from Laplace pressure and a tangential shear-resistance force that opposes relative motion along the fabric surface. By formulating these forces as potential energy for conservative effects and as mechanical work for non-conservative effects, we construct a physics-consistent wetness loss. This enables self-supervised training without requiring labeled data of wet clothing. Our humidity-sensitive dynamics are driven by a multi-layer graph neural network, which facilitates a smooth and physically realistic transition between different moisture levels. This architecture decouples the garment's dynamics in wet and dry states through a local weight interpolation mechanism, adjusting the fabric's behavior in response to varying humidity conditions. Experiments demonstrate that SHGS outperforms existing methods in both visual fidelity and computational efficiency, marking a significant advancement in realistic wet-cloth simulation.",
    tags: ['GarmentSimulation'],
    imageKeyword: 'machine learning robustness diagram',
    links: { paper: 'https://onlinelibrary.wiley.com/doi/full/10.1111/cgf.70236' },
    bibtex: `@article{shi2025shgs,
Author = {Shi, M. and Wang, X. and Zhang, J. and Gao, L. and Zhu, D. and Zhang, H.},
Title = {Self-Supervised Humidity-Controllable Garment Simulation via Capillary
   Bridge Modeling},
Journal = {COMPUTER GRAPHICS FORUM},
Year = {2025},
Volume = {44},
Number = {7},
Month = {OCT},
DOI = {10.1111/cgf.70236},
EarlyAccessDate = {OCT 2025},
ISSN = {0167-7055},
EISSN = {1467-8659},
Unique-ID = {WOS:001590874700001},
}`
  },
  {
    id: 'motionretargeting',
    imgPath: '/images/works/smr.png',
    title: 'Skinned Motion Retargeting with Preservation of Body Part Relationships',
    authors: '<b><u>Jia-Qi Zhang</u></b>, Miao Wang, Fu-Cheng Zhang, Fang-Lue Zhang',
    venue: 'IEEE Transactions on Visualization and Computer Graphics (TVCG, CCF A)',
    year: 2025,
    abstract: "Motion retargeting is an active research area in computer graphics and animation, allowing for the transfer of motion from one character to another, thereby creating diverse animated character data. While this technology has numerous applications in animation, games, and movies, current methods often produce unnatural or semantically inconsistent motion when applied to characters with different shapes or joint counts. This is primarily due to a lack of consideration for the geometric and spatial relationships between the body parts of the source and target characters. To tackle this challenge, we introduce a novel spatially-preserving Skinned Motion Retargeting Network (SMRNet) capable of handling motion retargeting for characters with varying shapes and skeletal structures while maintaining semantic consistency. By learning a hybrid representation of the character's skeleton and shape in a rest pose, SMRNet transfers the rotation and root joint position of the source character's motion to the target character through embedded rest pose feature alignment. Additionally, it incorporates a differentiable loss function to further preserve the spatial consistency of body parts between the source and target. Comprehensive quantitative and qualitative evaluations demonstrate the superiority of our approach over existing alternatives, particularly in preserving spatial relationships more effectively.",
    tags: ['Retargeting'],
    imageKeyword: 'diffusion model art abstract',
    links: { paper: 'https://ieeexplore.ieee.org/document/10586814'},
    bibtex: `@ARTICLE{zhang2025smr,
  author={Zhang, Jia-Qi and Wang, Miao and Zhang, Fu-Cheng and Zhang, Fang-Lue},
  journal={IEEE Transactions on Visualization and Computer Graphics}, 
  title={Skinned Motion Retargeting With Preservation of Body Part Relationships}, 
  year={2025},
  volume={31},
  number={9},
  pages={4923-4936},
  keywords={Skeleton;Shape;Joints;Animation;Semantics;Bones;Task analysis;Motion retargeting;spatial relationship;different structure},
  doi={10.1109/TVCG.2024.3423426}
}`
  },
  {
    id: 'HoughLaneNet',
    imgPath: '/images/works/houghlanenet.png',
    title: 'HoughLaneNet: Lane Detection with Deep Hough Transform and Dynamic Convolution',
    authors: '<b><u>Jia-Qi Zhang</u></b>, Miao Wang, Fu-Cheng Zhang, Fang-Lue Zhang',
    venue: 'Computers & Graphics (Best Paper, CG, CCF C)',
    year: 2023,
    abstract: "The task of lane detection has garnered considerable attention in the field of autonomous driving due to its complexity. Lanes can present difficulties for detection, as they can be narrow, fragmented, and often obscured by heavy traffic. However, it has been observed that the lanes have a geometrical structure that resembles a straight line, leading to improved lane detection results when utilizing this characteristic. To address this challenge, we propose a hierarchical Deep Hough Transform (DHT) approach that combines all lane features in an image into the Hough parameter space. Additionally, we refine the point selection method and incorporate a Dynamic Convolution Module to effectively differentiate between lanes in the original image. Our network architecture comprises a backbone network, either a ResNet or Pyramid Vision Transformer, a Feature Pyramid Network as the neck to extract multi-scale features, and a hierarchical DHT-based feature aggregation head to accurately segment each lane. By utilizing the lane features in the Hough parameter space, the network learns dynamic convolution kernel parameters corresponding to each lane, allowing the Dynamic Convolution Module to effectively differentiate between lane features. Subsequently, the lane features are fed into the feature decoder, which predicts the final position of the lane. Our proposed network structure demonstrates improved performance in detecting heavily occluded or worn lane images, as evidenced by our extensive experimental results, which show that our method outperforms or is on par with state-of-the-art techniques.",
    tags: ['LaneDetection'],
    imageKeyword: 'diffusion model art abstract',
    links: { paper: 'https://arxiv.org/pdf/2307.03494', code: 'https://github.com/Jiaqi-zhang/HoughLaneNet'},
    bibtex: `@article{houghlanenet2023,
Author = {Zhang, Jia-Qi and Duan, Hao-Bin and Chen, Jun-Long and Shamir, Ariel and Wang, Miao},
Title = {HoughLaneNet: Lane detection with deep hough transform and dynamic convolution},
Journal = {COMPUTERS \& GRAPHICS-UK},
Year = {2023},
Volume = {116},
Pages = {82-92},
Month = {NOV},
DOI = {10.1016/j.cag.2023.08.012},
EarlyAccessDate = {AUG 2023},
ISSN = {0097-8493},
EISSN = {1873-7684},
}`
  },
  {
    id: 'ReferColorization',
    imgPath: '/images/works/Colorization.png',
    title: 'Reference-Based Deep Line Art Video Colorization',
    authors: 'Min Shi#, <b><u>Jia-Qi Zhang#</u></b>, Shu-Yu Chen, Lin Gao, Yu-Kun Lai, Fang-Lue Zhang',
    venue: 'IEEE Transactions on Visualization and Computer Graphics (TVCG, CCF A)',
    year: 2023,
    abstract: "Coloring line art images based on the colors of reference images is a crucial stage in animation production, which is time-consuming and tedious. This paper proposes a deep architecture to automatically color line art videos with the same color style as the given reference images. Our framework consists of a color transform network and a temporal refinement network based on 3U-net. The color transform network takes the target line art images as well as the line art and color images of the reference images as input and generates corresponding target color images. To cope with the large differences between each target line art image and the reference color images, we propose a distance attention layer that utilizes non-local similarity matching to determine the region correspondences between the target image and the reference images and transforms the local color information from the references to the target. To ensure global color style consistency, we further incorporate Adaptive Instance Normalization (AdaIN) with the transformation parameters obtained from a multiple-layer AdaIN that describes the global color style of the references extracted by an embedder network. The temporal refinement network learns spatiotemporal features through 3D convolutions to ensure the temporal color consistency of the results. Our model can achieve even better coloring results by fine-tuning the parameters with only a small number of samples when dealing with an animation of a new style. To evaluate our method, we build a line art coloring dataset. Experiments show that our method achieves the best performance on line art video coloring compared to the current state-of-the-art methods.",
    tags: ['Colorization'],
    imageKeyword: 'diffusion model art abstract',
    links: { paper: 'https://ieeexplore.ieee.org/document/9693178', video: 'https://youtu.be/-1e7hRmXCEY'},
    bibtex: `@ARTICLE{shi2023referencebased,
  author={Shi, Min and Zhang, Jia-Qi and Chen, Shu-Yu and Gao, Lin and Lai, Yu-Kun and Zhang, Fang-Lue},
  journal={IEEE Transactions on Visualization and Computer Graphics}, 
  title={Reference-Based Deep Line Art Video Colorization}, 
  year={2023},
  volume={29},
  number={6},
  pages={2965-2979},
  keywords={Image color analysis;Art;Animation;Feature extraction;Three-dimensional displays;Transforms;Color;Line art colorization;color transform;temporal coherence;few shot learning},
  doi={10.1109/TVCG.2022.3146000}
}`
  },
  {
    id: 'ColorSurvey',
    imgPath: '/images/works/survey.png',
    title: 'A review of image and video colorization: From analogies to deep learning',
    authors: 'Shu-Yu Chen, <b><u>Jia-Qi Zhang</u></b>, You-You Zhao, Paul L. Rosin, Yu-Kun Lai, Lin Gao',
    venue: 'Visual Informatics (VI)',
    year: 2022,
    abstract: "Image colorization is a classic and important topic in computer graphics, where the aim is to add color to a monochromatic input image to produce a colorful result. In this survey, we present the history of colorization research in chronological order and summarize popular algorithms in this field. Early work on colorization mostly focused on developing techniques to improve the colorization quality. In the last few years, researchers have considered more possibilities such as combining colorization with NLP (natural language processing) and focused more on industrial applications. To better control the color, various types of color control are designed, such as providing reference images or color-scribbles. We have created a taxonomy of the colorization methods according to the input type, divided into grayscale, sketch-based and hybrid. The pros and cons are discussed for each algorithm, and they are compared according to their main characteristics. Finally, we discuss how deep learning, and in particular Generative Adversarial Networks (GANs), has changed this field.",
    tags: ['Colorization'],
    imageKeyword: 'diffusion model art abstract',
    links: { paper: 'https://www.sciencedirect.com/science/article/pii/S2468502X22000389'},
    bibtex: `@article{CHEN202251,
title = {A review of image and video colorization: From analogies to deep learning},
journal = {Visual Informatics},
volume = {6},
number = {3},
pages = {51-68},
year = {2022},
issn = {2468-502X},
doi = {https://doi.org/10.1016/j.visinf.2022.05.003},
author = {Shu-Yu Chen and Jia-Qi Zhang and You-You Zhao and Paul L. Rosin and Yu-Kun Lai and Lin Gao},
keywords = {Image colorization, Sketch colorization, Manga colorization},
}`
  },
  {
    id: 'activecolorization',
    imgPath: '/images/works/color2020.png',
    title: 'Active Colorization for Cartoon Line Drawing',
    authors: 'Shu-Yu Chen#, <b><u>Jia-Qi Zhang#</u></b>, Lin Gao, Yue He, Shi-Hong Xia, Min Shi, Fang-Lue Zhang',
    venue: 'IEEE Transactions on Visualization and Computer Graphics (TVCG, CCF A)',
    year: 2022,
    abstract: "In the animation industry, the colorization of raw sketch images is a vitally important but very time-consuming task. This article focuses on providing a novel solution that semiautomatically colorizes a set of images using a single colorized reference image. Our method is able to provide coherent colors for regions that have similar semantics to those in the reference image. An active learning based framework is used to match local regions, followed by mixed-integer quadratic programming (MIQP) which considers the spatial contexts to further refine the matching results. We efficiently utilize user interactions to achieve high accuracy in the final colorized images. Experiments show that our method outperforms the current state-of-the-art deep learning based colorization method in terms of color coherency with the reference image. The region matching framework could potentially be applied to other applications, such as color transfer.",
    tags: ['Colorization'],
    imageKeyword: 'diffusion model art abstract',
    links: { paper: 'https://ieeexplore.ieee.org/abstract/document/9143503', video: 'https://youtu.be/OCkJhaoupcU'},
    bibtex: `@ARTICLE{chen2022active,
  author={Chen, Shu-Yu and Zhang, Jia-Qi and Gao, Lin and He, Yue and Xia, Shihong and Shi, Min and Zhang, Fang-Lue},
  journal={IEEE Transactions on Visualization and Computer Graphics}, 
  title={Active Colorization for Cartoon Line Drawings}, 
  year={2022},
  volume={28},
  number={2},
  pages={1198-1208},
  keywords={Image color analysis;Image segmentation;Semantics;Feature extraction;Shape;Machine learning;Animation;Active learning;line drawing colorization;region matching},
  doi={10.1109/TVCG.2020.3009949}
}`
  },
  {
    id: 'WriteAnimation',
    imgPath: '/images/works/egteaser.png',
    title: 'Write-An-Animation: High-level Text-based Animation Editing with Character-Scene Interaction',
    authors: '<b><u>Jia-Qi Zhang</u></b>, Xiang Xu, Shen Z.M, Huang Z.H, Yang Zhao, Cao Y.P, Wan P.F, Miao Wang',
    venue: 'Pacific Conference on Computer Graphics and Applications (PG, CCF B)',
    year: 2021,
    abstract: "3D animation production for storytelling requires essential manual processes of virtual scene composition, character creation, and motion editing, etc. Although professional artists can favorably create 3D animations using software, it remains a complex and challenging task for novice users to handle and learn such tools for content creation. In this paper, we present Write-An-Animation, a 3D animation system that allows novice users to create, edit, preview, and render animations, all through text editing. Based on the input texts describing virtual scenes and human motions in natural languages, our system first parses the texts as semantic scene graphs, then retrieves 3D object models for virtual scene composition and motion clips for character animation. Character motion is synthesized with the combination of generative locomotions using neural state machine as well as template action motions retrieved from the dataset. Moreover, to make the virtual scene layout compatible with character motion, we propose an iterative scene layout and character motion optimization algorithm that jointly considers character-object collision and interaction. We demonstrate the effectiveness of our system with customized texts and public film scripts. Experimental results indicate that our system can generate satisfactory animations from texts.",
    tags: ['Animation'],
    imageKeyword: 'diffusion model art abstract',
    links: { paper: 'https://diglib.eg.org/bitstream/handle/10.1111/cgf14415/v40i7pp217-228.pdf', video: 'https://youtu.be/3kgzasBL-UQ'},
    bibtex: `@article{zhang2021writeananimation,
Author = {Zhang, Jia-Qi and Xu, Xiang and Shen, Zhi-Meng and Huang, Ze-Huan and Zhao, Yang and Cao, Yan-Pei and Wan, Pengfei and Wang, Miao},
Title = {Write-An-Animation: High-level Text-based Animation Editing with Character-Scene Interaction},
Journal = {COMPUTER GRAPHICS FORUM},
Year = {2021},
Volume = {40},
Number = {7},
Pages = {217-228},
Month = {OCT},
DOI = {10.1111/cgf.14415},
ISSN = {0167-7055},
EISSN = {1467-8659},
}`
  },
]

/** Open-source or lab projects to showcase. */
export const projects: ProjectItem[] = [
  {
    title: 'Subway Cockpit',
    description: "Using data collected from three cameras, this project reconstructs the driver's movements within a subway cockpit in three dimensions.",
    imageKeyword: 'Target Identification in Multi-View Videos and Virtual Avatar Generation',
    imgPath: '/images/projects/vr_subway.gif',
    link: '#',
  },
  {
    title: 'Blender',
    description: 'Blender is a free and open-source 3D computer graphics software tool set that runs on Windows, macOS, Linux, BSD, Haiku, and IRIX. ',
    imageKeyword: 'Blender 5.0 splash by Juan Hernández',
    imgPath: '/images/projects/blender.jpg',
    link: 'https://www.blender.org/',
  },
  {
    title: 'Cherry Studio',
    description: 'Cherry Studio is a desktop client that supports multiple LLM providers, available on Windows, Mac and Linux.',
    imageKeyword: 'data benchmark charts dashboard',
    imgPath: '/images/projects/cherry.png',
    link: 'https://github.com/CherryHQ/cherry-studio',
  },
]

/** Personal gallery mosaic images keyed by concept keywords. */
export const gallery: GalleryItem[] = [
  { srcKeyword: 'tsinghua cardiff workshop', alt: 'Keynote', imgPath: '/images/gallery/TCWorkshop.jpg' },
  { srcKeyword: 'computer graphics', alt: 'Keynote', imgPath: '/images/gallery/cg_pic.jpg' },
  { srcKeyword: 'computer graphics', alt: 'Awards', imgPath: '/images/gallery/cg_best.jpg' },
  { srcKeyword: '3D Vision', alt: 'Keynote', imgPath: '/images/gallery/3dv.jpg' },
]

/** Institutions/organizations logos to display in one centered row. */
export const affiliations: AffiliationItem[] = [
  { name: 'PhD - BUAA University', src: '/images/buaa_logo.png' },
  { name: 'Master - NCEPU University', src: '/images/ncepu_logo.png' },
]
