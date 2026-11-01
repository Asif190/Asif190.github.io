---
title: Research
lede: Clinically interpretable breast cancer imaging, efficient multimodal vision, and how models hold up when the data shifts.
body_class: research-page
---

## Clinically interpretable breast cancer imaging

<p class="meta-line">Undergraduate thesis (EEE 400), BUET, January – June 2026. Joint work with Md Nazmus Sakib Tushar. Supervisor: Prof. Lutfa Akter, Department of EEE.</p>

Most breast imaging models are judged on overlap scores alone, which hides the failures that matter to a radiologist: a lesion clipped away during preprocessing, a boundary that drifts at low contrast, or a BI-RADS prediction that collapses onto the majority class. Our thesis, *Toward Clinically Interpretable Breast Cancer Imaging: A Boundary-Aware Hybrid Framework for Ultrasound Lesion Segmentation and Multimodal Mammographic Classification with BI-RADS-Aware Fusion*, addresses one such failure in each of three stages of the pipeline.

<ol class="stages">
<li>
<h3>Pectoral muscle removal that preserves lesions</h3>
<p>In mediolateral oblique mammograms the pectoral muscle has to be removed before analysis, but aggressive removal can delete lesions near the chest wall. We designed a Lesion-Aware Attention U-Net trained with a composite loss on a hybrid set of manual and confidence-filtered pseudo-labels, and introduced the <strong>Lesion Preservation Rate (LPR)</strong> to measure how much lesion tissue survives segmentation — to our knowledge the first such metric in the pectoral segmentation literature.</p>
<p class="result">DSC 0.897; mean LPR 97.7% (median 100%) on the 26 test cases where lesion and muscle overlap, against 81.1% for the best classical baseline — a 16.6 percentage-point gain (p &lt; 0.001). Data: CBIS-DDSM, with external validation on VinDr-Mammo.</p>
<div class="fig-row">{% include figure.html file="thesis/part1-qualitative" large=true caption="Qualitative result on a CBIS-DDSM MLO test case (thesis Fig. 7.1): original image, ground truth, predicted three-region mask (green breast, red pectoral muscle, black background), overlay, and the pectoral-removed output. The predicted boundary is smoother than the ground truth, which costs some DSC, but the muscle is removed and the breast tissue, including the lesion, is kept (LPR 100% for this case)." alt="Five panels: original mammogram, ground-truth mask, predicted mask, overlay, and the mammogram with the pectoral muscle removed" %}</div>
<div class="fig-row">{% include figure.html file="thesis/part1-framework" large=true caption="Lesion-Aware Attention U-Net: preprocessing and the attention-gated U-Net that outputs a three-class mask (top), and the composite training loss combining strong labels, pseudo-labels and the lesion safety penalty (bottom). Thesis Fig. 6.1." alt="Diagram of the Lesion-Aware Attention U-Net inference pipeline and training framework" %}{% include figure.html file="thesis/part1-lpr-analysis" large=true caption="Lesion Preservation Rate on the 26 lesion–muscle overlap cases: distribution, comparison with the best classical baseline by pathology, DSC–LPR correlation, and summary statistics. From the thesis, Chapter 7." alt="Four-panel chart of LPR results" %}</div>
</li>
<li>
<h3>Boundary-aware ultrasound lesion segmentation</h3>
<p>Ultrasound lesions have speckle noise and weak, irregular margins. A hybrid network combines a pretrained residual encoder, a windowed self-attention bottleneck, channel–spatial attention and feature-style randomisation, with a boundary-aware auxiliary head. All five baselines were retrained under the same stratified k-fold protocol, with component ablations and fold-level significance tests.</p>
<p class="result">Mean Dice 77.28% on BUSI and 82.17% on UDIAT, 2.36 and 3.61 points above the strongest baseline (paired t-test, p &lt; 0.05); 88.61% on BUS-BRA, statistically comparable to the best baseline. Lowest cross-fold variance on all three datasets.</p>
<div class="fig-row">{% include figure.html file="thesis/part2-preprocessing" large=true caption="Ultrasound preprocessing pipeline: CLAHE contrast enhancement, edge-preserving bilateral despeckling, morphological edge accentuation, adaptive gamma normalisation and resizing to 320 × 320, with a signed-distance-function target derived from each training mask for the boundary-aware auxiliary head. From the thesis, Chapter 9." alt="Flowchart from raw ultrasound through CLAHE, bilateral filter, morphology, adaptive gamma and resize, with an SDF target branch" %}</div>
<div class="fig-row">{% include figure.html file="thesis/part2-architecture" large=true caption="Network architecture: pretrained ResNet-34 encoder, windowed self-attention bottleneck with CBAM, attention-gated decoder, and training-only SDF and deep-supervision heads." alt="Encoder-decoder architecture diagram with attention gates and a windowed self-attention bottleneck" %}{% include figure.html file="thesis/part2-ablation" large=true caption="Component ablation on BUSI: change in Dice when each component is removed. Feature-style randomisation (MixStyle) and CBAM contribute most." alt="Horizontal bar chart of Dice change per removed component" %}</div>
<div class="table-wrap"><table class="results">
<caption>Mean Dice (%) ± standard deviation across folds, all methods retrained under the same protocol (thesis Table 10.1). Best per dataset in bold.</caption>
<thead><tr><th>Method</th><th>BUSI</th><th>UDIAT</th><th>BUS-BRA</th></tr></thead>
<tbody>
<tr><td>U-Net</td><td>74.92 ± 3.95</td><td>76.15 ± 3.58</td><td>86.11 ± 1.45</td></tr>
<tr><td>U-Net++</td><td>72.35 ± 5.28</td><td>78.21 ± 3.66</td><td>88.25 ± 0.55</td></tr>
<tr><td>Attention U-Net</td><td>73.11 ± 2.60</td><td>76.15 ± 4.79</td><td>87.49 ± 0.39</td></tr>
<tr><td>DeepLabV3+</td><td>74.57 ± 2.54</td><td>76.32 ± 4.08</td><td><strong>88.74 ± 0.47</strong></td></tr>
<tr><td>MA-Net</td><td>72.96 ± 2.50</td><td>78.56 ± 3.93</td><td>86.42 ± 0.96</td></tr>
<tr class="ours"><td>Ours</td><td><strong>77.28 ± 2.43</strong></td><td><strong>82.17 ± 1.48</strong></td><td>88.61 ± 0.16</td></tr>
</tbody></table></div>
</li>
<li>
<h3>BI-RADS-aware multimodal fusion</h3>
<p>BI-RADS categories are ordered, and the rarer high-suspicion classes are the ones that matter most. <strong>BOCAF</strong> (Bidirectional Ordinal Cross-Attention Fusion) lets mammogram features and clinical metadata attend to each other, and is trained with a CORAL ordinal loss with class-imbalance weighting and a threshold-separation penalty to prevent recall collapse on minority categories.</p>
<p class="result">Quadratic weighted kappa 0.793 and macro AUC 0.841 on the official VinDr-Mammo test set, improving on the strongest unimodal and simple-fusion baselines (p &lt; 0.05).</p>
<div class="table-wrap"><table class="results">
<caption>Test-set results on VinDr-Mammo (thesis Table 14.1). QWK = quadratic weighted kappa; MAE = mean absolute error in BI-RADS categories; last column = recall on BI-RADS 4 / 5. * p &lt; 0.05 versus the best baseline.</caption>
<thead><tr><th>Method</th><th>QWK ↑</th><th>Macro AUC ↑</th><th>Accuracy ↑</th><th>MAE ↓</th><th>BR4 / BR5 recall ↑</th></tr></thead>
<tbody>
<tr><td>Image only</td><td>0.741</td><td>0.779</td><td>0.694</td><td>0.341</td><td>0.47 / 0.81</td></tr>
<tr><td>Clinical only</td><td>0.612</td><td>0.703</td><td>0.631</td><td>0.412</td><td>0.31 / 0.62</td></tr>
<tr><td>Concat + MLP fusion</td><td>0.758</td><td>0.801</td><td>0.711</td><td>0.318</td><td>0.52 / 0.86</td></tr>
<tr><td>Cross-attention (one-way)</td><td>0.771</td><td>0.814</td><td>0.724</td><td>0.298</td><td>0.58 / 0.90</td></tr>
<tr><td>BOCAF without prototype attention</td><td>0.779</td><td>0.821</td><td>0.731</td><td>0.288</td><td>0.61 / 0.92</td></tr>
<tr class="ours"><td>BOCAF</td><td><strong>0.793*</strong></td><td><strong>0.841*</strong></td><td><strong>0.737</strong></td><td><strong>0.279</strong></td><td><strong>0.67 / 0.95</strong></td></tr>
</tbody></table></div>
<p class="meta-line">Per-class F1 rises most on the hard middle categories: BI-RADS 2 from 0.000 (image only) to 0.421, and BI-RADS 4 from 0.214 to 0.523 (thesis Table 14.2).</p>
</li>
</ol>

<p class="tools">Tools: PyTorch, 3D Slicer, SimpleITK, scikit-learn, OpenCV. Datasets: CBIS-DDSM, VinDr-Mammo, BUSI, UDIAT, BUS-BRA. A journal manuscript extending the ultrasound work is in preparation (<a href="{{ '/publications/' | relative_url }}">publications</a>). The full thesis (119 pages, defended June 2026) is available on request.</p>

## Multimodal detection and tracking for aerial platforms

<p class="meta-line">Group of Prof. Shaikh Anowarul Fattah, Department of EEE, BUET, 2025.</p>

Distinguishing drones from birds is hard in smoke, haze and low light, and counter-UAV systems usually have to run on modest hardware. The IEEE VIP Cup 2025 challenge, *Infrared–Visual Fusion for Enhanced Drone Detection, Tracking and Payload Identification in Surveillance Videos*, supplied paired RGB and infrared video. Our competition system, **DeepDroneTrack**, chained a lightweight detector, ByteTrack-based tracking tuned for the infrared stream with a direction-of-motion estimate per track, and an RGB + infrared early-fusion classifier for harmful versus normal payloads. Two pieces of it became papers:

- **EGD-YOLO**, a lightweight detector that adds Ghost modules and Efficient Multi-scale Attention (EMA) to YOLOv8n for robust discrimination under adverse conditions. I built the Ghost and EMA modules and the RGB–IR data pipeline, ran the experiments and ablations, and co-wrote the paper ([arXiv:2510.10765](https://arxiv.org/abs/2510.10765)).
- **A real-time multimodal tracker** that uses modality-aware adaptation and physics-aware filtering to keep identities stable across frames ([IEEE WIECON-ECE 2025](https://ieeexplore.ieee.org/document/11526317)). Its four-channel EGD-YOLOv8n fusion detector reached 70.1% mAP, 13.8% above single-modality baselines with 59% fewer parameters, and the full pipeline ran at 97.87 FPS. I built the detection model, ran the tracking experiments and evaluation, and co-wrote the paper.

<div class="fig-row">{% include figure.html file="pubs/egd-yolo-architecture" large=true caption="EGD-YOLO architecture: Ghost blocks in the backbone, EMA attention in the neck." alt="EGD-YOLO architecture diagram" %}{% include figure.html file="pubs/egd-yolo-detections" large=true caption="EGD-YOLO detections of drones and birds in RGB and infrared frames." alt="Six frames with drone and bird detection boxes" %}{% include figure.html file="pubs/tracking-snapshots" large=true caption="Multimodal tracking with trajectories and approaching / constant-distance estimates (WIECON-ECE 2025)." alt="Four tracking frames with trajectories and direction labels" %}</div>

Our team, EyeQ (supervised by Prof. Fattah and mentored by Anjan Kumar Bagchi), placed Second Runner-Up (third place) in the final at ICIP 2025 in Anchorage, Alaska; see [Awards & Honours]({{ '/awards/' | relative_url }}). The same concern for on-device efficiency drives [HIVE-R]({{ '/projects/' | relative_url }}), a swarm UAV system whose YOLOv8n detector runs at 185 ms per frame on a Raspberry Pi 4.

## Current work

<p class="meta-line">Manuscripts in preparation, 2026, with colleagues at BUET.</p>

- **When the data shifts.** Political memes in Bangladesh mix Bangla, English and Romanised Banglish, and their subjects changed sharply after July 2024. Starting from the PoliMemeDecode benchmark released for the CUET Datathon, where my team was a finalist, S. Sarkar, R. Mahmud, M. M. Islam and I are studying why multimodal meme classifiers that look strong on held-out data degrade on memes collected later, and which fixes survive a strict validation-only protocol.
- **Combining detectors honestly.** A follow-up to the VIP Cup work that profiles and ablates a range of RGB and thermal detectors under a matched protocol, then asks when fusing their outputs actually helps and what it costs in latency on the edge.

## Earlier work

- Mammogram classification with AMF and CLAHE preprocessing, GMM-HMRF lesion segmentation, texture features reduced by PCA, and SVM, random-forest, PNN and neural-network classifiers, served through a Streamlit app; the SVM reached 83.3% accuracy and 0.98 AUC ([ICCIT 2025](https://ieeexplore.ieee.org/document/11490289)).
- Multimodal sentiment analysis of 5,000 course evaluations with MAG-BERT, LoRA-fine-tuned FLAN-T5 suggestions and SHAP explanations: 86.4% accuracy, 0.91 AUC and macro-F1 0.87 on a held-out test set ([ICCIT 2025](https://ieeexplore.ieee.org/document/11491303)).
- Variational quantum classifiers in Qiskit evaluated under simulated NISQ noise.

<div class="fig-row">{% include figure.html file="pubs/gmm-hmrf-workflow" large=true caption="GMM-HMRF breast cancer classification workflow (ICCIT 2025, Fig. 9)." alt="GMM-HMRF workflow diagram" %}{% include figure.html file="pubs/gmm-hmrf-segmentation" large=true caption="CBIS-DDSM mammogram region and its GMM-HMRF segmentation (ICCIT 2025, Fig. 4)." alt="Mammogram patch and segmentation mask" %}{% include figure.html file="pubs/magbert-architecture" large=true caption="MAG-BERT architecture with text and numeric modality gates (ICCIT 2025, Fig. 3)." alt="MAG-BERT architecture diagram" %}</div>

## Directions I want to pursue

I am interested in segmentation and diagnosis models whose errors are measurable in clinical terms, in learning from small and imbalanced medical datasets, in multimodal models that combine imaging with patient records, in evaluation that tells us how a model will behave when the data shifts, and in making these models small enough to run where they are needed. I am seeking a Ph.D. position starting in Fall 2027 to pursue these questions.
