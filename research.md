---
title: Research
lede: Clinically interpretable breast cancer imaging, efficient multimodal vision, and how models hold up when the data shifts.
body_class: research-page
---

## Clinically interpretable breast cancer imaging

<p class="meta-line">Undergraduate thesis (EEE 400), BUET, January – June 2026. Joint work with Md Nazmus Sakib Tushar. Supervisor: Prof. Lutfa Akter, Department of EEE.</p>

Most breast imaging models are judged on overlap scores alone, which hides the failures that matter to a radiologist: a lesion clipped away during preprocessing, a boundary that drifts at low contrast, or a BI-RADS prediction that collapses onto the majority class. Our thesis, *Toward Clinically Interpretable Breast Cancer Imaging: A Boundary-Aware Hybrid Framework for Ultrasound Lesion Segmentation and Multimodal Mammographic Classification with BI-RADS-Aware Fusion*, addresses one such failure in each of three stages of the pipeline.

{% include thesis-diagram.html %}

<ol class="stages">
<li>
<h3>Pectoral muscle removal that preserves lesions</h3>
<p>In mediolateral oblique mammograms the pectoral muscle has to be removed before analysis, but aggressive removal can delete lesions near the chest wall. We designed a Lesion-Aware Attention U-Net trained with a composite loss on a hybrid set of manual and confidence-filtered pseudo-labels, and introduced the <strong>Lesion Preservation Rate (LPR)</strong> to measure how much lesion tissue survives segmentation — to our knowledge the first such metric in the pectoral segmentation literature.</p>
<p class="result">DSC 0.897; mean LPR 97.7% (median 100%) on the 26 test cases where lesion and muscle overlap, against 81.1% for the best classical baseline — a 16.6 percentage-point gain (p &lt; 0.001). Data: CBIS-DDSM, with external validation on VinDr-Mammo.</p>
</li>
<li>
<h3>Boundary-aware ultrasound lesion segmentation</h3>
<p>Ultrasound lesions have speckle noise and weak, irregular margins. A hybrid network combines a pretrained residual encoder, a windowed self-attention bottleneck, channel–spatial attention and feature-style randomisation, with a boundary-aware auxiliary head. All five baselines were retrained under the same stratified k-fold protocol, with component ablations and fold-level significance tests.</p>
<p class="result">Mean Dice 77.28% on BUSI and 82.17% on UDIAT, 2.36 and 3.61 points above the strongest baseline (paired t-test, p &lt; 0.05); 88.61% on BUS-BRA, statistically comparable to the best baseline. Lowest cross-fold variance on all three datasets.</p>
</li>
<li>
<h3>BI-RADS-aware multimodal fusion</h3>
<p>BI-RADS categories are ordered, and the rarer high-suspicion classes are the ones that matter most. <strong>BOCAF</strong> (Bidirectional Ordinal Cross-Attention Fusion) lets mammogram features and clinical metadata attend to each other, and is trained with a CORAL ordinal loss with class-imbalance weighting and a threshold-separation penalty to prevent recall collapse on minority categories.</p>
<p class="result">Quadratic weighted kappa 0.793 and macro AUC 0.841 on the official VinDr-Mammo test set, improving on the strongest unimodal and simple-fusion baselines (p &lt; 0.05).</p>
</li>
</ol>

<p class="tools">Tools: PyTorch, 3D Slicer, SimpleITK, scikit-learn, OpenCV. Datasets: CBIS-DDSM, VinDr-Mammo, BUSI, UDIAT, BUS-BRA. A journal manuscript extending the ultrasound work is in preparation (<a href="{{ '/publications/' | relative_url }}">publications</a>).</p>

## Multimodal detection and tracking for aerial platforms

<p class="meta-line">Group of Prof. Shaikh Anowarul Fattah, Department of EEE, BUET, 2025.</p>

Distinguishing drones from birds is hard in smoke, haze and low light, and counter-UAV systems usually have to run on modest hardware. Working with RGB and infrared imagery from the IEEE VIP Cup 2025 challenge, our team developed:

- **EGD-YOLO**, a lightweight detector that adds Ghost modules and Efficient Multi-scale Attention (EMA) to YOLOv8n for robust discrimination under adverse conditions. I built the Ghost and EMA modules and the RGB–IR data pipeline, ran the experiments and ablations, and co-wrote the paper ([arXiv:2510.10765](https://arxiv.org/abs/2510.10765)).
- **A real-time multimodal tracker** that uses modality-aware adaptation and physics-aware filtering to keep identities stable across frames ([IEEE WIECON-ECE 2025](https://ieeexplore.ieee.org/document/11526317)). I built the detection model, ran the tracking experiments and evaluation, and co-wrote the paper.

Our team, EyeQ, placed Second Runner-Up (third place) in the IEEE VIP Cup 2025 final at ICIP 2025 in Anchorage, Alaska. The same concern for on-device efficiency drives [HIVE-R]({{ '/projects/' | relative_url }}), a swarm UAV system whose YOLOv8n detector runs at 185 ms per frame on a Raspberry Pi 4.

## Current work

<p class="meta-line">Manuscripts in preparation, 2026, with colleagues at BUET.</p>

- **When the data shifts.** Political memes in Bangladesh mix Bangla, English and Romanised Banglish, and their subjects changed sharply after July 2024. With S. Sarkar, R. Mahmud and M. M. Islam, I am studying why multimodal meme classifiers that look strong on held-out data degrade on memes collected later, and which fixes survive a strict validation-only protocol.
- **Combining detectors honestly.** A follow-up to the VIP Cup work that profiles and ablates a range of RGB and thermal detectors under a matched protocol, then asks when fusing their outputs actually helps and what it costs in latency on the edge.

## Earlier work

- Probabilistic mammogram segmentation with a Gaussian mixture model regularised by a hidden Markov random field, followed by PCA-reduced classifiers ([ICCIT 2025](https://ieeexplore.ieee.org/document/11490289)).
- Multimodal sentiment analysis of course feedback with MAG-BERT, LoRA-fine-tuned T5 summarisation and SHAP explanations ([ICCIT 2025](https://ieeexplore.ieee.org/document/11491303)).
- Variational quantum classifiers in Qiskit evaluated under simulated NISQ noise.

## Directions I want to pursue

I am interested in segmentation and diagnosis models whose errors are measurable in clinical terms, in learning from small and imbalanced medical datasets, in multimodal models that combine imaging with patient records, in evaluation that tells us how a model will behave when the data shifts, and in making these models small enough to run where they are needed. I am seeking a Ph.D. position starting in Fall 2027 to pursue these questions.
