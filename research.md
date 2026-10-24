---
title: Research
lede: Two lines of work — clinically interpretable breast cancer imaging, and efficient multimodal vision for aerial platforms.
body_class: research-page
---

## Clinically interpretable breast cancer imaging

<p class="meta-line">Undergraduate thesis (EEE 400), BUET, January – June 2026. Supervisor: Prof. Lutfa Akter, Department of EEE.</p>

Most breast imaging models are judged on overlap scores alone, which hides the failures that matter to a radiologist: a lesion clipped away during preprocessing, a boundary that drifts at low contrast, or a BI-RADS prediction that collapses onto the majority class. The thesis, *Toward Clinically Interpretable Breast Cancer Imaging: A Boundary-Aware Hybrid Framework for Ultrasound Lesion Segmentation and Multimodal Mammographic Classification with BI-RADS-Aware Fusion*, addresses one such failure in each of three stages of the pipeline.

{% include thesis-diagram.html %}

<ol class="stages">
<li>
<h3>Pectoral muscle removal that preserves lesions</h3>
<p>In mediolateral oblique mammograms the pectoral muscle has to be removed before analysis, but aggressive removal can delete lesions near the chest wall. I designed a Lesion-Aware Attention U-Net trained with a composite loss, and introduced the <strong>Lesion Preservation Rate (LPR)</strong> to measure how much lesion tissue survives segmentation — to my knowledge the first such metric in the pectoral segmentation literature.</p>
<p class="result">DSC 0.897; LPR 97.7%, a 16.6 percentage-point gain over the strongest baseline (p &lt; 0.001). Data: CBIS-DDSM.</p>
</li>
<li>
<h3>Boundary-aware ultrasound lesion segmentation</h3>
<p>Ultrasound lesions have speckle noise and weak, irregular margins. A hybrid encoder combines residual convolutional blocks with windowed self-attention, and a boundary-aware loss penalises errors at the lesion margin specifically. The model was compared against five baselines under cross-validation on three public datasets.</p>
<p class="result">Dice 77.28% on BUSI, 82.17% on UDIAT and 88.61% on BUS-BRA, outperforming all five baselines.</p>
</li>
<li>
<h3>BI-RADS-aware multimodal fusion</h3>
<p>BI-RADS categories are ordered, and the rarer high-suspicion classes are the ones that matter most. <strong>BOCAF</strong> (Bidirectional Ordinal Cross-Attention Fusion) lets mammogram features and clinical metadata attend to each other, and is trained with a CORAL ordinal loss with class-imbalance weighting and a threshold-separation penalty to prevent recall collapse on minority categories.</p>
<p class="result">Quadratic weighted kappa 0.793 and AUC 0.841 on VinDr-Mammo.</p>
</li>
</ol>

<p class="tools">Tools: PyTorch, NumPy, scikit-learn, OpenCV. Datasets: CBIS-DDSM, VinDr-Mammo, BUSI, UDIAT, BUS-BRA.</p>

## Multimodal detection and tracking for aerial platforms

<p class="meta-line">Group of Prof. Shaikh Anowarul Fattah, Department of EEE, BUET, 2025.</p>

Distinguishing drones from birds is hard in smoke, haze and low light, and counter-UAV systems usually have to run on modest hardware. Working with RGB and infrared imagery from the IEEE VIP Cup 2025 challenge, our team developed:

- **EGD-YOLO**, a lightweight detector that adds Ghost modules and Efficient Multi-scale Attention (EMA) to YOLOv8n for robust discrimination under adverse conditions. I built the Ghost and EMA modules and the RGB–IR data pipeline, ran the experiments and ablations, and co-wrote the paper ([arXiv:2510.10765](https://arxiv.org/abs/2510.10765)).
- **A real-time multimodal tracker** that uses modality-aware adaptation and physics-aware filtering to keep identities stable across frames (IEEE WIECON-ECE 2025). I built the detection model, ran the tracking experiments and evaluation, and co-wrote the paper.

This work placed Second Runner-Up at the IEEE VIP Cup 2025 at ICIP 2025. The same concern for on-device efficiency drives [HIVE-R]({{ '/projects/' | relative_url }}), a swarm UAV system whose YOLOv8n detector runs at 185 ms per frame on a Raspberry Pi 4.

## Earlier work

- Probabilistic mammogram segmentation with a Gaussian mixture model regularised by a hidden Markov random field, followed by PCA-reduced classifiers (ICCIT 2025).
- Multimodal sentiment analysis of course feedback with MAG-BERT, LoRA-fine-tuned T5 summarisation and SHAP explanations (ICCIT 2025).
- Variational quantum classifiers in Qiskit evaluated under simulated NISQ noise.

## Directions I want to pursue

I am interested in segmentation and diagnosis models whose errors are measurable in clinical terms, in learning from small and imbalanced medical datasets, in multimodal models that combine imaging with patient records, and in making these models small enough to run where they are needed. I am seeking a Ph.D. position starting in Fall 2027 to pursue these questions.
