/**
 * =============================================
 * Forward-Chaining Inference Engine
 * processes facts against rules to reach conclusions
 * =============================================
 */

class InferenceEngine {
    constructor(knowledgeBase) {
        this.kb = knowledgeBase;
        this.facts = new Set();
        this.results = [];
    }

    /**
     * Run the inference process based on selected facts (symptoms)
     */
    run(selectedFacts) {
        this.facts = new Set(selectedFacts);
        this.results = [];
        
        const possibleDiseases = new Map(); // diseaseId -> { count, total, matchingFacts }

        // 1. Direct Pattern Matching (Heuristic)
        // Check which diseases have matching symptoms
        const allDiseases = this.kb.getAllDiseases();
        
        allDiseases.forEach(disease => {
            const matchingFacts = disease.symptoms.filter(s => this.facts.has(s));
            const matchCount = matchingFacts.length;
            
            if (matchCount >= (disease.minSymptoms || 1)) {
                const confidence = (matchCount / disease.symptoms.length) * 100;
                possibleDiseases.set(disease.id, {
                    id: disease.id,
                    name: disease.name,
                    confidence: Math.round(confidence),
                    matchingFacts: matchingFacts,
                    description: disease.description,
                    recommendation: disease.recommendation,
                    severity: disease.severity,
                    source: 'heuristic'
                });
            }
        });

        // 2. Rule-Based Inference (Forward Chaining)
        // Apply IF-THEN rules from the knowledge base
        this.kb.rules.forEach(rule => {
            const hasAllConditions = rule.conditions.every(c => this.facts.has(c));
            
            if (hasAllConditions) {
                const disease = this.kb.getDisease(rule.conclusion);
                if (disease) {
                    const existing = possibleDiseases.get(rule.conclusion);
                    const ruleConfidence = rule.cf * 100;
                    
                    if (existing) {
                        // Combine confidence scores (Simple additive model for demo)
                        existing.confidence = Math.min(100, Math.max(existing.confidence, Math.round(ruleConfidence)));
                        existing.source = 'rule-based';
                        if (!existing.rulesTriggered) existing.rulesTriggered = [];
                        existing.rulesTriggered.push(rule.description);
                    } else {
                        possibleDiseases.set(rule.conclusion, {
                            id: rule.conclusion,
                            name: disease.name,
                            confidence: Math.round(ruleConfidence),
                            matchingFacts: rule.conditions,
                            description: disease.description,
                            recommendation: disease.recommendation,
                            severity: disease.severity,
                            source: 'rule-based',
                            rulesTriggered: [rule.description]
                        });
                    }
                }
            }
        });

        // Convert Map to sorted array
        this.results = Array.from(possibleDiseases.values())
            .sort((a, b) => b.confidence - a.confidence);

        return {
            results: this.results,
            factCount: this.facts.size,
            rulesApplied: this.kb.rules.length
        };
    }
}
