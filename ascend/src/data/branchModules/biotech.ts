import type { BranchModuleData } from "./types";
import { makeVideoLinks } from "./types";

export const BIOTECH_MODULES: BranchModuleData[] = [
  {
    moduleTitle: "Bioinformatics and Sequence Analysis",
    level: "Foundation",
    branch: ["biotech"],
    videos: makeVideoLinks("Bioinformatics Sequence Analysis BLAST"),
    studyMaterial: {
      summary: "Bioinformatics merges biology and computer science to analyze DNA, RNA, and protein sequences. Core algorithms: BLAST for database search, Smith-Waterman for local alignment, Needleman-Wunsch for global alignment. Essential databases: NCBI, UniProt, PDB.",
      keyPoints: [
        "DNA bases: Adenine pairs Thymine (2 H-bonds), Guanine pairs Cytosine (3 H-bonds)",
        "Central Dogma: DNA to RNA (transcription) to Protein (translation)",
        "BLAST finds similar sequences in databases using heuristic local alignment",
        "E-value below 0.001 is statistically significant — lower means stronger match",
        "GC content = (G+C)/total x 100 — high GC means thermally stable DNA",
        "ORF: region from start codon ATG to stop codon TAA, TAG, or TGA",
        "FASTA format: header line starts with >, followed by sequence lines",
        "Needleman-Wunsch uses dynamic programming for global alignment scoring",
        "k-mer counting enables efficient genome assembly and motif discovery",
        "Multiple Sequence Alignment tools: ClustalW, MUSCLE, MAFFT"
      ],
      example: "GC content of ATGCGCATGC = 6/10 x 100 = 60%. BLAST e-value 1e-10 indicates an extremely significant match unlikely to be random.",
      complexity: "BLAST: O(n*m) worst case, O(n) average with heuristics"
    },
    aiExplain: {
      steps: [
        "DNA is a recipe book — each gene is one recipe for one protein",
        "BLAST is Google for biology — finds related sequences across millions of organisms instantly",
        "Alignment is comparing two paragraphs to find matching words, insertions, and deletions",
        "E-value is a confidence score — lower means match is real, not lucky coincidence"
      ],
      analogy: "Bioinformatics is like being a detective who decodes ancient biological manuscripts to understand how diseases work and how life evolved at the molecular level."
    },
    debug: [
      {
        title: "Fix the reverse complement function",
        buggy: "def complement(seq):\n    m = {'A':'T','T':'A','G':'C','C':'G'}\n    return ''.join(m[b] for b in seq)  # Missing reversal!",
        fixed: "def reverse_complement(seq):\n    m = {'A':'T','T':'A','G':'C','C':'G'}\n    return ''.join(m[b] for b in reversed(seq))",
        hint: "DNA complement must be reversed — strands run antiparallel in 3 to 5 direction"
      }
    ],
    quiz: [
      { q: "Which algorithm performs global sequence alignment?", options: ["BLAST", "Smith-Waterman", "Needleman-Wunsch", "Dijkstra"], answer: 2 },
      { q: "Low BLAST e-value indicates?", options: ["Poor match", "Significant match", "Database error", "Short sequence"], answer: 1 },
      { q: "Central Dogma order?", options: ["Protein to RNA to DNA", "RNA to DNA to Protein", "DNA to RNA to Protein", "DNA to Protein only"], answer: 2 },
      { q: "High GC content means?", options: ["Less stable DNA", "More stable DNA", "Faster replication", "More mutations"], answer: 1 },
      { q: "ORF begins with which codon?", options: ["TAA", "TAG", "ATG", "TGA"], answer: 2 }
    ],
    mnc: [
      { company: "Illumina", year: "2024", question: "Reference-based vs de novo genome assembly?", answer: "Reference-based maps reads to existing genome using BWA or Bowtie2. De novo builds genome from scratch using de Bruijn graphs — required for novel organisms with no reference." }
    ],
    mock: [
      { type: "Technical", question: "How to identify protein function from amino acid sequence only?", tip: "BLAST against UniProt for homologs, Pfam/InterPro for domains, PSIPRED for secondary structure, AlphaFold for 3D structure prediction." }
    ],
    coding: {
      problem: "Calculate GC Content",
      desc: "Given a DNA sequence string, return the percentage of G and C bases.",
      input: "ATGCGCATGC",
      output: "60.0",
      starter: "def gc_content(seq: str) -> float:\n    return round((seq.count('G') + seq.count('C')) / len(seq) * 100, 2)"
    }
  },
  {
    moduleTitle: "PCR and Molecular Diagnostics",
    level: "Foundation",
    branch: ["biotech"],
    videos: makeVideoLinks("PCR Polymerase Chain Reaction molecular diagnostics"),
    studyMaterial: {
      summary: "PCR amplifies DNA via thermal cycling: Denaturation 95C, Annealing 55-65C, Extension 72C. After 30 cycles: 2^30 copies from one template. RT-PCR converts RNA to cDNA. qPCR quantifies using fluorescence. CRISPR-Cas9 enables precise genome editing.",
      keyPoints: [
        "PCR steps: Denature 95C (separate strands), Anneal 55-65C (primers bind), Extend 72C (Taq synthesizes)",
        "30 PCR cycles produce approximately 1 billion copies from a single DNA molecule",
        "Gel electrophoresis separates fragments by size — smaller fragments travel farther in agarose",
        "ELISA quantifies proteins via antibody-antigen binding and enzyme-linked color change",
        "Western blot detects specific proteins after SDS-PAGE using labeled antibodies",
        "CRISPR-Cas9: guide RNA directs Cas9 to cut specific genomic location for editing",
        "RT-PCR: reverse transcriptase converts RNA to cDNA before amplification",
        "qPCR Ct value: lower Ct means higher initial template abundance",
        "Southern blot detects DNA, Northern blot detects RNA, Western blot detects protein",
        "Flow cytometry counts and sorts cells by fluorescent marker intensity at thousands per second"
      ],
      example: "qPCR: If control Ct=25 and treated Ct=23, fold change = 2^(25-23) = 4x higher expression in treated sample.",
    },
    aiExplain: {
      steps: [
        "PCR is a molecular photocopier — makes billions of copies of your target DNA sequence",
        "Primers are address labels that tell the enzyme exactly which section to copy",
        "Gel electrophoresis is a molecular race — smaller fragments finish first through the gel obstacle course",
        "CRISPR is molecular find-and-replace for genomes — locates one specific sequence and edits it"
      ],
      analogy: "Molecular biology techniques are the engineering tools of biology: PCR finds and copies blueprints, CRISPR edits them, and blotting techniques verify all changes are correct."
    },
    debug: [
      {
        title: "Fix qPCR delta-delta Ct calculation",
        buggy: "def fold_change(ct_target, ct_ref):\n    return ct_target - ct_ref  # Wrong — missing delta-delta",
        fixed: "def fold_change(ct_tgt_tx, ct_ref_tx, ct_tgt_ctrl, ct_ref_ctrl):\n    dCt_tx = ct_tgt_tx - ct_ref_tx\n    dCt_ctrl = ct_tgt_ctrl - ct_ref_ctrl\n    return 2 ** -(dCt_tx - dCt_ctrl)",
        hint: "Delta-delta Ct requires normalization to reference gene AND comparison to untreated control"
      }
    ],
    quiz: [
      { q: "Denaturation temperature in PCR?", options: ["55C", "72C", "95C", "37C"], answer: 2 },
      { q: "In gel electrophoresis, smaller fragments?", options: ["Stay at start", "Travel less", "Travel farther", "All equal"], answer: 2 },
      { q: "CRISPR cuts DNA using?", options: ["DNA ligase", "Taq polymerase", "Cas9 nuclease", "Restriction enzyme"], answer: 2 },
      { q: "Lower Ct in qPCR means?", options: ["Less template", "More template", "Failed reaction", "Wrong primer"], answer: 1 }
    ],
    mnc: [
      { company: "Roche", year: "2024", question: "How do you design a qPCR assay for detecting viral load?", answer: "Design primers flanking 70-150bp amplicon in conserved viral region. Use TaqMan probe for specificity. Validate with standard curve (5-log range), test efficiency 90-110%, confirm no cross-reactivity with host DNA or related viruses." }
    ],
    mock: [
      { type: "Technical", question: "You get no band in PCR gel. Troubleshoot systematically.", tip: "Check: template quality (nanodrop), primer Tm (should be within 5C of each other), Mg2+ (1.5-2.5 mM optimal), annealing temperature (try gradient PCR), cycle number, and positive control reaction." }
    ],
    coding: {
      problem: "Find All Primer Binding Sites",
      desc: "Given DNA template and primer, find all positions where primer binds (including overlapping).",
      input: "template='ATGCGATCGATGC', primer='ATGC'",
      output: "Binding positions: [0, 9]",
      starter: "def find_primer_sites(template: str, primer: str) -> list:\n    positions = []\n    start = 0\n    while True:\n        pos = template.find(primer, start)\n        if pos == -1: break\n        positions.append(pos)\n        start = pos + 1\n    return positions"
    }
  },
  {
    moduleTitle: "Genetic Engineering and Recombinant DNA",
    level: "Core",
    branch: ["biotech"],
    videos: makeVideoLinks("Genetic Engineering Recombinant DNA cloning plasmid"),
    studyMaterial: {
      summary: "Recombinant DNA technology cuts and joins DNA from different organisms to produce useful proteins: insulin, growth hormone, vaccines. Key tools: restriction enzymes, DNA ligase, plasmid vectors, host organisms. Used commercially since Humulin insulin in 1982.",
      keyPoints: [
        "Restriction enzymes cut DNA at specific palindromic sequences — EcoRI cuts GAATTC creating sticky ends",
        "DNA ligase joins DNA fragments — molecular glue requiring ATP",
        "Plasmid vectors: small circular DNA replicating independently in host cells, contain MCS and selectable marker",
        "Blue-white screening: lacZ disruption identifies recombinant clones (white = insert, blue = no insert)",
        "Selectable markers (antibiotic resistance) allow selection of successfully transformed cells",
        "E. coli is primary host for protein expression — fast growth, cheap, well-characterized genetics",
        "CHO cells produce glycosylated proteins (therapeutic antibodies) with human-like glycans",
        "Expression vector components: promoter, RBS, MCS, His-tag, terminator, antibiotic resistance",
        "IPTG induces T7 promoter in pET vectors for high-level recombinant protein expression",
        "His-tag purification uses Ni-NTA affinity chromatography for one-step protein purification"
      ],
      example: "Recombinant insulin production: Clone human INS gene into pET-28a with His-tag, transform E. coli BL21(DE3), induce at OD600=0.6 with 1mM IPTG at 37C for 4h, purify via Ni-NTA column.",
    },
    aiExplain: {
      steps: [
        "Restriction enzymes are molecular scissors that cut DNA only at specific sequences",
        "Vectors are delivery vehicles — they carry your gene of interest into the host cell",
        "Transformation is like mailing a new instruction file to a biological factory",
        "Blue-white screening is a visual assay — white colonies have insert, blue ones do not"
      ],
      analogy: "Recombinant DNA is like editing a Word document: restriction enzymes cut, ligase pastes, vectors email the edited file to a factory (host cell) that produces the protein product."
    },
    debug: [
      {
        title: "Fix incomplete restriction digest setup",
        buggy: "reaction = {'DNA': dna, 'EcoRI': 1, 'Buffer': 'CutSmart'}  # Wrong buffer!",
        fixed: "reaction = {'DNA': dna, 'EcoRI': 1, 'Buffer': 'Buffer_3_1', 'BSA': 0.1, 'H2O': 'to_20ul', 'temp': '37C', 'time': '1h'}",
        hint: "NEB EcoRI uses Buffer 3.1 with BSA, not CutSmart. Wrong buffer reduces cutting efficiency significantly."
      }
    ],
    quiz: [
      { q: "Which enzyme joins DNA fragments?", options: ["DNA polymerase", "Helicase", "DNA ligase", "EcoRI"], answer: 2 },
      { q: "Blue-white screening identifies?", options: ["Bacterial contamination", "Recombinant clones", "Protein expression", "DNA quality"], answer: 1 },
      { q: "EcoRI recognition sequence?", options: ["AAGCTT", "GAATTC", "GGATCC", "CTCGAG"], answer: 1 },
      { q: "Which cell line produces glycosylated therapeutic proteins?", options: ["E. coli", "CHO cells", "Yeast only", "Insect cells"], answer: 1 }
    ],
    mnc: [
      { company: "Biocon", year: "2024", question: "Choose expression system for a glycosylated therapeutic antibody.", answer: "CHO cells — they perform human-like glycosylation patterns essential for antibody efficacy, half-life, and Fc receptor binding. E. coli lacks glycosylation machinery entirely." }
    ],
    mock: [
      { type: "Technical", question: "Design a cloning strategy for a 2kb gene into pET-28a expression vector.", tip: "PCR amplify gene with primers adding NdeI and XhoI restriction sites. Digest PCR product and vector. Ligate. Transform BL21(DE3). Screen by colony PCR. Confirm with sequencing. Test expression with IPTG induction." }
    ],
    coding: {
      problem: "Find Restriction Enzyme Cut Sites",
      desc: "Given DNA and restriction enzyme recognition sequences, find all cut positions.",
      input: "dna='GAATTCATGCGAATTCGGATCC', enzymes={'EcoRI':'GAATTC','BamHI':'GGATCC'}",
      output: "{'EcoRI': [0, 12], 'BamHI': [18]}",
      starter: "def find_cut_sites(dna: str, enzymes: dict) -> dict:\n    results = {}\n    for name, site in enzymes.items():\n        pos, start = [], 0\n        while True:\n            p = dna.find(site, start)\n            if p == -1: break\n            pos.append(p); start = p+1\n        results[name] = pos\n    return results"
    }
  },
  {
    moduleTitle: "Fermentation and Bioprocessing",
    level: "Core",
    branch: ["biotech"],
    videos: makeVideoLinks("Fermentation Technology Bioreactor Scale-up Bioprocessing"),
    studyMaterial: {
      summary: "Bioprocessing uses living cells to produce commercial products at scale. Upstream: cell culture optimization. Downstream: harvest, purification, formulation. Critical parameters: pH, temperature, dissolved oxygen, agitation. Scale-up from lab to industrial scale requires constant kLa for oxygen transfer.",
      keyPoints: [
        "Fed-batch fermentation: substrate added intermittently to prevent inhibition — most common industrial mode",
        "Chemostat: continuous culture at steady state where dilution rate D equals specific growth rate mu",
        "Monod equation: mu = mu_max x S / (Ks + S) — relates growth rate to limiting substrate",
        "kLa: volumetric oxygen transfer coefficient — must stay constant during scale-up",
        "P/V ratio: power per volume for agitation — key scale-up parameter",
        "Downstream: centrifugation, depth filtration, UF/DF, chromatography (affinity, IEX, SEC), lyophilization",
        "Yield coefficient Yx/s: grams biomass per gram substrate — efficiency metric",
        "GMP validation required before commercial production: process validation, cleaning validation",
        "Critical Process Parameters (CPP) and Critical Quality Attributes (CQA) per ICH Q8",
        "Penicillium chrysogenum produces penicillin — classic fed-batch fermentation product"
      ],
      example: "Scale-up from 10L to 10000L: maintain constant P/V (0.5 kW/m3) and kLa (0.1/s). Impeller speed decreases but diameter increases to maintain mixing. DO must stay above 30%.",
    },
    aiExplain: {
      steps: [
        "A bioreactor is a controlled hotel for microorganisms — perfect temperature, food, and oxygen",
        "Fed-batch is like a carefully managed buffet — control feeding rate to maximize productivity",
        "Downstream processing filters, purifies, and packages the biological product for patients",
        "Scale-up challenge: mixing and oxygen transfer become harder as volume increases 1000-fold"
      ],
      analogy: "Bioprocessing is running a precision factory where the workers are microorganisms. You optimize their environment, feed them optimally, then extract, purify, and package their output."
    },
    debug: [
      {
        title: "Fix specific growth rate calculation",
        buggy: "def growth_rate(x1, x2, t1, t2):\n    return (x2 - x1) / (t2 - t1)  # This is dX/dt, not specific rate!",
        fixed: "import math\ndef specific_growth_rate(x1, x2, t1, t2):\n    # mu = ln(X2/X1) / (t2-t1)\n    return math.log(x2/x1) / (t2 - t1)",
        hint: "Specific growth rate mu uses natural log of biomass ratio divided by time — not absolute change"
      }
    ],
    quiz: [
      { q: "Monod equation relates growth rate to?", options: ["Temperature", "Substrate concentration", "pH", "Oxygen level"], answer: 1 },
      { q: "In chemostat at steady state, D equals?", options: ["Zero", "mu (specific growth rate)", "mu_max", "Ks"], answer: 1 },
      { q: "kLa represents?", options: ["Substrate transfer", "Oxygen transfer coefficient", "Heat transfer", "Growth constant"], answer: 1 },
      { q: "Fed-batch advantage over batch?", options: ["Simpler operation", "Prevents substrate inhibition", "No pH control needed", "Faster growth"], answer: 1 }
    ],
    mnc: [
      { company: "Dr Reddys", year: "2024", question: "How to scale up fermentation from 10L to 10000L?", answer: "Maintain geometric similarity, constant P/V ratio for mixing, constant kLa for oxygen transfer. Monitor DO, pH, temperature continuously. Run validation batches at 100L and 1000L. Use DOE to identify critical parameters and acceptable ranges." }
    ],
    mock: [
      { type: "Technical", question: "What parameters would you monitor in a mammalian cell bioreactor?", tip: "pH 7.2-7.4, DO above 30%, temperature 37C, CO2 5%, glucose, lactate, ammonia, viable cell density, viability, osmolality. Cell specific productivity (pg/cell/day) for antibody titer." }
    ],
    coding: {
      problem: "Monod Growth Simulation",
      desc: "Calculate specific growth rates at given substrate concentrations using Monod equation.",
      input: "mu_max=0.5, Ks=0.1, S=[0, 0.1, 0.5, 1.0, 5.0]",
      output: "[0.0, 0.25, 0.417, 0.455, 0.495]",
      starter: "def monod(mu_max: float, Ks: float, S_values: list) -> list:\n    return [round(mu_max * S / (Ks + S), 3) for S in S_values]"
    }
  }
];
