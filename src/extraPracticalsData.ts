export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ExtraPracticalInfo {
  detailedTheory: string;
  realWorldApplication: string;
  stepByStepAlgorithm: string[];
  homeworkQuestions: string[];
  interactiveQuiz: QuizQuestion[];
  simulatedTerminalOutput: string;
}

export const EXTRA_PRACTICALS_INFO: Record<string, ExtraPracticalInfo> = {
  "1a-matrix-ops": {
    detailedTheory: "Matrices are rectangular arrays of numbers that serve as the foundational bedrock of linear algebra, quantum mechanics, computer graphics, and machine learning neural weights. Matrix addition scales linearly and is commutative: A + B = B + A. However, matrix multiplication (using the operator @ in Python NumPy) is non-commutative in general (A @ B != B @ A) and requires strict compliance with dimensions: an (m x n) matrix multiplied by an (n x p) matrix yields an (m x p) matrix, performing row-column dot products. Scalar multiplication scales the internal vector space proportionally.",
    realWorldApplication: "In Computer Vision, image convolutions, rotations, and affine transformations are represented as matrix transformations applied on grid pixel spaces.",
    stepByStepAlgorithm: [
      "Initialize matrices A and B using np.array() specifying float lists.",
      "For Matrix Addition, verify that A.shape == B.shape. If matched, perform element-wise summation.",
      "For Scalar Multiplication, multiply target constant k directly with matrix A, yielding element-wise scaling k * A_ij.",
      "For Matrix Multiplication, check if shape of A columns matches shape of B rows. If matched, calculate sum of products over shared dimensions using np.dot(A, B) or the @ operator."
    ],
    homeworkQuestions: [
      "Let A = [[3, 2], [1, 5]] and B = [[0, -1], [4, 6]]. Compute 3A - 2B analytically and verify with Python.",
      "Explain with an example why matrix multiplication A @ B is not commutative."
    ],
    interactiveQuiz: [
      {
        question: "Under what condition is matrix multiplication A @ B valid?",
        options: [
          "A and B must have the exact same dimensions.",
          "The number of rows of A must equal the number of columns of B.",
          "The number of columns of A must equal the number of rows of B.",
          "Both A and B must be square matrices."
        ],
        correctIndex: 2,
        explanation: "Matrix multiplication requires that the inner dimensions match: the columns of the left matrix (A) must equal the rows of the right matrix (B)."
      },
      {
        question: "If matrix A is of size 3x2 and matrix B is 2x4, what is the dimension of the product A @ B?",
        options: ["2x2", "3x4", "2x4", "Operation is invalid"],
        correctIndex: 1,
        explanation: "The outer dimensions determine the size of the resulting matrix. A (3 x 2) multiplied by B (2 x 4) yields a matrix of size 3 x 4."
      }
    ],
    simulatedTerminalOutput: `>>> python matrix_operations.py
--- INPUT MATRICES ---
Matrix A:
 [[ 2.  4. -1.]
 [ 3.  0.  8.]
 [-2.  5.  1.]]

Matrix B:
 [[ 1. -2.  3.]
 [ 0.  5.  2.]
 [ 4. -1.  0.]]

Scalar k: 3.5

--- 1. MATRIX ADDITION (A + B) ---
[[ 3.  2.  2.]
 [ 3.  5. 10.]
 [ 2.  4.  1.]]

--- 2. SCALAR MULTIPLICATION (k * A) ---
[[  7.   14.   -3.5]
 [ 10.5   0.    28. ]
 [ -7.   17.5    3.5]]

--- 3. MATRIX MULTIPLICATION (A @ B) ---
[[-2. 17. 14.]
 [35. -14.  9.]
 [ 2.  28.  4.]]

[Process completed successfully - Exit Code 0]`
  },
  "1b-eigen": {
    detailedTheory: "Eigenvalues (λ) and eigenvectors (v) characterize the invariant directional properties of linear operators. The matrix operation scales the eigenvector strictly along its linear span: A v = λ v. This leads to the characteristic equation det(A - λI) = 0, solvable as an n-th degree polynomial. If a matrix has a complete set of linearly independent eigenvectors, it can be diagonalized into D = P^-1 A P. Diagonalization is highly prized because raising a diagonal matrix to a power k is trivially computed as raising its individual diagonal elements to k.",
    realWorldApplication: "Google's PageRank algorithm solves the dominant eigenvector of a massive Markov transition matrix representing the web page link graph.",
    stepByStepAlgorithm: [
      "Define the square matrix A.",
      "Call np.linalg.eig(A) which uses LAPACK routines to solve eigenvalues and normalized eigenvectors.",
      "Extract the modal matrix P (eigenvectors as columns) and diagonal eigenvalue matrix D.",
      "Verify the decomposition by reconstructing A_recon = P @ D @ np.linalg.inv(P)."
    ],
    homeworkQuestions: [
      "For a 2x2 matrix A = [[3, 1], [0, 2]], find the eigenvalues and corresponding eigenvectors by hand.",
      "State the algebraic and geometric multiplicity conditions required for a square matrix to be diagonalizable."
    ],
    interactiveQuiz: [
      {
        question: "What does the characteristic equation det(A - λI) = 0 calculate?",
        options: [
          "The matrix determinant",
          "The eigenvalues of matrix A",
          "The matrix inverse",
          "The rank of matrix A"
        ],
        correctIndex: 1,
        explanation: "Solving det(A - λI) = 0 gives the roots of the characteristic polynomial, which are the eigenvalues of matrix A."
      },
      {
        question: "If a matrix is diagonalizable, what does the diagonal matrix D contain?",
        options: [
          "Zeros on the diagonal and ones elsewhere",
          "The components of the eigenvectors",
          "The eigenvalues of the matrix along its primary diagonal",
          "The raw row-reduced echelon pivots"
        ],
        correctIndex: 2,
        explanation: "D = P^-1 * A * P is a diagonal matrix whose non-zero diagonal entries are the eigenvalues of matrix A corresponding to the order of column eigenvectors in P."
      }
    ],
    simulatedTerminalOutput: `>>> python eigen_diagonalization.py
Matrix A:
 [[4. 2. 0.]
 [2. 4. 0.]
 [0. 0. 5.]]

--- EIGENVALUES ---
λ_1 = 6.0000
λ_2 = 2.0000
λ_3 = 5.0000

--- EIGENVECTORS (Columns of modal matrix P) ---
v_1 = [0.7071, 0.7071, 0.0000]^T
v_2 = [-0.7071, 0.7071, 0.0000]^T
v_3 = [0.0000, 0.0000, 1.0000]^T

--- DIAGONALIZATION PROOF ---
Modal Matrix P:
 [[ 0.7071 -0.7071  0.    ]
 [ 0.7071  0.7071  0.    ]
 [ 0.      0.      1.    ]]

Diagonal Matrix D (Eigenvalues on diagonal):
 [[6. 0. 0.]
 [0. 2. 0.]
 [0. 0. 5.]]

P @ D @ P^-1 (Reconstructed Matrix A):
 [[4. 2. 0.]
 [2. 4. 0.]
 [0. 0. 5.]]

Reconstruction match verification: TRUE

[Process completed successfully - Exit Code 0]`
  },
  "1c-gaussian": {
    detailedTheory: "Gaussian Elimination is an analytical, algorithmic procedure for solving systems of linear equations (A x = b). By appending the vector b to the right of coefficient matrix A, we create the 'augmented matrix'. We perform three elementary row operations (row swapping, scaling, addition) to convert the lower triangular portion to zeros (Row Echelon Form). Once in echelon layout, we solve for variables using Back Substitution starting from the bottom row.",
    realWorldApplication: "Structural engineering models solve thousands of simultaneous static stress equations using sparse Gaussian solvers.",
    stepByStepAlgorithm: [
      "Construct the augmented matrix of size n x (n+1) combining coefficient A and vector b.",
      "Iterate through columns, locating the maximum absolute pivot value in lower rows, and swap rows to minimize numerical division errors (Partial Pivoting).",
      "Perform row-reduction: replace row R_j with R_j - (A_ji / A_ii) * R_i to eliminate coefficients beneath the pivot element.",
      "Confirm upper-triangular echelon form, then perform back-substitution to calculate variables x_n down to x_1."
    ],
    homeworkQuestions: [
      "Solve the system [2x + y = 5, x - y = 1] using Gaussian row operations step-by-step.",
      "Explain the importance of partial pivoting in floating-point computer arithmetic."
    ],
    interactiveQuiz: [
      {
        question: "Why is 'partial pivoting' used during Gaussian Elimination?",
        options: [
          "To speed up the matrix multiplication",
          "To ensure the matrix is symmetric",
          "To avoid division by zero and decrease rounding-off errors",
          "To calculate eigenvalues"
        ],
        correctIndex: 2,
        explanation: "Partial pivoting selects the largest absolute value in the current pivot column and swaps rows, preventing division by extremely small numbers or absolute zero, which improves numerical stability."
      },
      {
        question: "When does Gaussian elimination fail to find a unique solution?",
        options: [
          "When the determinant of A is non-zero",
          "When the coefficient matrix A is singular (determinant is zero)",
          "When the vector b contains negative integers",
          "When pivoting is performed on the first column"
        ],
        correctIndex: 1,
        explanation: "If det(A) = 0, the matrix is singular (rows are linearly dependent), and the system either has infinitely many solutions or no solution."
      }
    ],
    simulatedTerminalOutput: `>>> python gaussian_elimination.py
--- SETTING UP SIMULTANEOUS EQUATIONS ---
Equation 1:  2.0*x + 1.0*y - 1.0*z = 8.0
Equation 2: -3.0*x - 1.0*y + 2.0*z = -11.0
Equation 3: -2.0*x + 1.0*y + 2.0*z = -3.0

Augmented Matrix (A|b):
[[ 2.  1. -1.  8.]
 [-3. -1.  2. -11.]
 [-2.  1.  2. -3.]]

--- STARTING TRACE ELIMINATION ---
Column 0 pivot operations:
Row Swap: R1 swapped with R2 (to maximize pivot = -3.0)
Pivot Selected: -3.0
Eliminating Row 2: R2 -> R2 - (-0.667 * R1)
Eliminating Row 3: R3 -> R3 - (0.667 * R1)

Column 1 representation:
Pivot Selected: 1.667
Eliminating Row 3: R3 -> R3 - (0.200 * R2)

--- UPPER ECHELON MATRIX COMPLETED ---
[[ -3.          -1.           2.         -11.        ]
 [  0.           0.33333333   0.33333333   0.66666667 ]
 [  0.           0.           3.2         -3.2        ]]

--- INITIATING BACK-SUBSTITUTION ---
Solving z: 3.2 * z = -3.2  =>  z = -1.0000
Solving y: 0.3333 * y + (0.3333 * -1.0) = 0.6667  =>  y = 3.0000
Solving x: -3.0 * x - (1.0 * 3.0) + (2.0 * -1.0) = -11.0  =>  x = 2.0000

--- VERIFIED SOLUTIONS ---
x = 2.0000
y = 3.0000
z = -1.0000

Verification result (A @ x - b): [0. 0. 0.] - SUCCESS

[Process completed successfully - Exit Code 0]`
  },
  "2a-distribs": {
    detailedTheory: "Probability distributions are mathematical blueprints mapping variables to likelihood frequencies. They fall into two categories: Discrete (distinct outcomes countable by integers, e.g., Binomial) and Continuous (smooth real-valued outcomes, e.g., Normal). The Binomial Distribution calculates successes in fixed trial sequences with constant success step p, modeling discrete processes with probability mass function P(X=k) = C(n,k) * p^k * (1-p)^(n-k). The Normal (Gaussian) Distribution models continuous physical variations. Defined by its mean (μ) and standard deviation (σ), it manifests a bell-shaped density curve modeled by its Probability Density Function (PDF).",
    realWorldApplication: "Finance models stock returns via lognormal continuous distributions; manufacturing lines test product failures via discrete Binomial pass/fail rates.",
    stepByStepAlgorithm: [
      "For Binomial, compute combinations nCr and multiply by success and failure power factors.",
      "Sum cumulative discrete mass intervals to secure interval probabilities.",
      "For Normal, apply the exact Gaussian equation utilizing rational constants for pi and exponent bases.",
      "Compute cumulative density function (CDF) areas using numerical approximations like the Error Function (erf)."
    ],
    homeworkQuestions: [
      "A coin is tossed 10 times. Find the discrete probability of getting exactly 7 heads.",
      "Explain the significance of the Empirical Rule (68-95-99.7) in Standard Normal Distributions."
    ],
    interactiveQuiz: [
      {
        question: "Which parameters are required to completely define a Binomial distribution?",
        options: [
          "Mean (μ) and Standard Deviation (σ)",
          "Rate lambda (λ)",
          "Number of trials (n) and success probability per trial (p)",
          "Lower (a) and upper (b) bounds"
        ],
        correctIndex: 2,
        explanation: "A Binomial distribution is completely specified by discrete configurations: the total trials 'n' and the probability of success 'p' in each individual trial."
      },
      {
        question: "What is the total area under the probability density curve of any continuous Normal distribution?",
        options: ["0.0", "0.5", "1.0", "Depends on the standard deviation"],
        correctIndex: 2,
        explanation: "By axiomatic definition, the integrated area under any valid probability density function across its entire domain (-infinity to +infinity) is strictly 1.0 (100%)."
      }
    ],
    simulatedTerminalOutput: `>>> python probability_distributions.py
--- 1. DISCRETE BINOMIAL DISTRIBUTION (n=15, p=0.40) ---
Mathematical Formulas: Mean = n*p, Variance = n*p*(1-p)
Distribution Mean μ = 6.00
Distribution Variance σ² = 3.60

Probability Mass Function (PMF) breakdown:
P(X = 0)  = 0.0005
P(X = 2)  = 0.0219
P(X = 4)  = 0.1268
P(X = 6)  = 0.2066  <-- Modal Outcome (Highest PMF peak)
P(X = 8)  = 0.1181
P(X = 10) = 0.0245
P(X = 12) = 0.0016
P(X = 14) = 0.0000

--- 2. CONTINUOUS NORMAL DISTRIBUTION (μ=50.00, σ=10.00) ---
Standard coordinates analysis:
Density (PDF) at X = 30.00 (-2 S.D.): 0.0054
Density (PDF) at X = 40.00 (-1 S.D.): 0.0242
Density (PDF) at X = 50.00 (Mean μ)  : 0.0399  <-- Peak Height
Density (PDF) at X = 60.00 (+1 S.D.): 0.0242
Density (PDF) at X = 70.00 (+2 S.D.): 0.0054

Cumulative Distribution Area (CDF):
P(X <= 40) : 0.1587
P(X <= 50) : 0.5000 (Symmetric Center)
P(30 <= X <= 70) : 0.9545 (95.4% within 2 Standard Deviations)

[Process completed successfully - Exit Code 0]`
  },
  "2b-joint-pmf": {
    detailedTheory: "When analyzing multiple random parameters simultaneously, we employ joint probability distributions. If variables X and Y are discrete, their coordinate pairings form a 'Joint Probability Mass Function' matrix where the sum of all elements must equal exactly 1.0. Marginal probabilities are computed by summing rows (for X) and columns (for Y). Linear association is evaluated via Covariance: Cov(X,Y) = E[XY] - Expected(X) * Expected(Y). Two variables are mathematically independent if and only if every cell matches its marginal multiplication products: P(X=x, Y=y) = P(X=x) * P(Y=y).",
    realWorldApplication: "Asset portfolio metrics calculate joint returns distributions of disparate mutual funds to diversify overall investment variance risk.",
    stepByStepAlgorithm: [
      "Input the grid matrix matching joint probability coordinates.",
      "Verify total sum is 1.0; compute marginal row arrays and marginal column arrays.",
      "Calculate Expected values: E[X] = sum(x_i * P(x_i)), E[Y] = sum(y_j * P(y_j)), and cross expected value E[XY] = sum(x_i * y_j * P(x_i, y_j)).",
      "Solve Covariance; iterate cells evaluating the independence condition."
    ],
    homeworkQuestions: [
      "Given joint PMF grid: P(0,0)=0.1, P(0,1)=0.3, P(1,0)=0.2, P(1,1)=0.4. Calculate the marginals and evaluate independence.",
      "Prove algebraically why Cov(X, Y) is zero if X and Y are independent."
    ],
    interactiveQuiz: [
      {
        question: "How do you obtain the marginal probability of X from a Joint PMF Table?",
        options: [
          "Sum across the rows for each fixed x coordinate",
          "Sum down the columns for each fixed y coordinate",
          "Multiply individual cell entries",
          "Take the diagonal entries only"
        ],
        correctIndex: 0,
        explanation: "To find the marginal distribution of X, you collapse the Y-dimension by summing across all columns (rows of X) in the joint table."
      },
      {
        question: "If Covariance Cov(X, Y) = 0, can we automatically state that X and Y are mathematically independent?",
        options: [
          "Yes, zero covariance always implies absolute independence.",
          "No, zero covariance only rules out linear relationships; they could have non-linear dependencies.",
          "Yes, only if they are discrete variables.",
          "No, covariance cannot equal zero."
        ],
        correctIndex: 1,
        explanation: "Covariance measures linear relationships. If Cov(X,Y) = 0, they are uncorrelated, but non-linear dependencies might still exist unless P(X, Y) = P(X) * P(Y) for all cells."
      }
    ],
    simulatedTerminalOutput: `>>> python joint_pmf.py
--- INPUT JOINT PMF TABLE (X rows, Y columns) ---
       Y_0     Y_1    Marginal(X)
X_0   0.10    0.20       0.30
X_1   0.15    0.25       0.40
X_2   0.20    0.10       0.30
M(Y)  0.45    0.55       1.00 (Total Sum)

--- EXPECTATION MATH ANALYTICS ---
E[X]  = (0 * 0.30) + (1 * 0.40) + (2 * 0.30) = 1.000
E[Y]  = (0 * 0.45) + (1 * 0.55) = 0.550
E[XY] = (1*1*0.25) + (2*1*0.10) = 0.450

Covariance Cov(X, Y) = E[XY] - E[X]*E[Y]
                     = 0.450 - (1.000 * 0.550)
                     = -0.1000

--- INDEPENDENCE EVALUATION ---
Checking: P(X=x, Y=y) = P(X=x) * P(Y=y)
At (0,0): P(X=0, Y=0) = 0.10. Marginal Prod = 0.30 * 0.45 = 0.135
Discrepancy detected: 0.100 != 0.135

CONCLUTION: The random variables X and Y are DEPENDENT (Not Independent).
Correlation slope direction is Negative (Covariance = -0.100)

[Process completed successfully - Exit Code 0]`
  },
  "2c-clt": {
    detailedTheory: "The Central Limit Theorem (CLT) is the crown jewel of statistical inference. It dictates that given a sufficiently large sample size (typically n >= 30) drawn from any arbitrary distribution with finite mean μ and variance σ², the distribution of the sample means will approximate a Gaussian Normal distribution. Furthermore, the mean of these sample means will converge exactly to population mean μ, while its variance reduces as standard error (σ_mean = σ / sqrt(n)). CLT explains why Normal distributions are ubiquitous in experimental observations.",
    realWorldApplication: "Polling agencies determine national consensus trends by aggregating relatively small sample groups, guaranteed by standard error convergence.",
    stepByStepAlgorithm: [
      "Select a non-normal source distribution (e.g., heavily skewed Exponential or Poisson).",
      "Run simulation loops: draw random samples of size n and compute their individual average means.",
      "Repeat this run K times (e.g., K = 1000) to construct the empirical sample means distribution.",
      "Plot the distribution density; compute mean and standard error, comparing standard values against analytical population indicators."
    ],
    homeworkQuestions: [
      "Explain in your own words why the standard error decreases as the sample size 'n' increases.",
      "Construct a conceptual draft showing how the sample means from a highly skewed exponential population evolve as n goes from 2 to 30."
    ],
    interactiveQuiz: [
      {
        question: "What does the CLT predict will happen to the shape of the sample means distribution as the sample size n increases?",
        options: [
          "It will match the parent distribution shape.",
          "It will become uniform.",
          "It will approximate a symetric Normal (bell-shaped) curve.",
          "It will become increasingly skewed."
        ],
        correctIndex: 2,
        explanation: "As sample size n increases, the distribution of random sample means mathematically approaches a symmetric Normal Gaussian curve, regardless of the parent distribution's shape."
      },
      {
        question: "If a population has standard deviation (σ) of 16 and we draw samples of size n=64, what is the Standard Error of the Mean?",
        options: ["16.0", "8.0", "2.0", "0.25"],
        correctIndex: 2,
        explanation: "Standard Error is calculated as: SE = σ / sqrt(n). Here, SE = 16 / sqrt(64) = 16 / 8 = 2.0."
      }
    ],
    simulatedTerminalOutput: `>>> python clt_simulator.py
--- POPULATION SPECIFICATIONS (Exponential, Mean = 2.000) ---
Notice: Exponential is highly skewed, completely non-normal.
Population μ = 2.000
Population σ = 2.000

--- CLT EMPIRICAL SIMULATION ---
Sample Size (n) per run: 50
Number of simulations (Runs): 500

Executing batch sample gathers...
100% completed.

--- SIMULATOR STATS COMPARED TO THEORY ---
Theoretical Mean E[X_bar] = Population Mean = 2.000
Empirical Mean of Sample Means = 1.996

Theoretical Standard Error (SE) = σ / sqrt(n)
                               = 2.000 / sqrt(50) = 0.2828
Empirical Standard Error of Sample Means = 0.2804

Skewness of sample means: 0.112 (Nearly perfectly symmetric!)
Kurtosis of sample means: 2.980 (Very close to Normal kurtosis of 3.0)

CONCLUSION: The empirical averages converge strongly to Normal distribution. 
Central Limit Theorem verified.

[Process completed successfully - Exit Code 0]`
  },
  "2d-t-f-z-distribs": {
    detailedTheory: "When assessing hypothesis tests with unknown population traits, we employ specialized continuous sample distributions. The Standard Normal (Z) curve assumes known variance. Student's t-Distribution accounts for small samples with unknown variance, introducing heavier symmetric tails defined by degrees of freedom (df = n - 1) to offset higher estimation error probability. As df grows, the t-distribution converges to standard Normal. Snedecor's F-Distribution models the ratio of two independent chi-square variables divided by their respective degrees of freedom (df1, df2); it is heavily skewed positive and underpins Analysis of Variance (ANOVA).",
    realWorldApplication: "Engineers compare variance tolerances of two manufacturing devices using F-distributions, and determine quality offsets with t-statistics.",
    stepByStepAlgorithm: [
      "Provide degrees of freedom configurations for evaluation.",
      "Initialize coordinate arrays covering appropriate density domains (e.g., -4 to +4 for Z/t, 0.1 to 5 for F).",
      "Perform PDF calculation loops using Gamma function estimations for Student's t and F probability distributions.",
      "Graph the curves simultaneously to analyze the thickness of tails and skew changes.",
      "Check tail-area parameters to determine threshold rejection bounds."
    ],
    homeworkQuestions: [
      "Why does a t-distribution have thicker tails than a standard normal Z-distribution?",
      "For what degrees of freedom threshold does the Student's t-distribution become virtually identical to Standard Normal Z?"
    ],
    interactiveQuiz: [
      {
        question: "What parameter dictates the exact shape and kurtosis of Student's t-distribution?",
        options: ["Mean", "Standard Deviation", "Skewness value code", "Degrees of Freedom (df)"],
        correctIndex: 3,
        explanation: "The degrees of freedom (df = n-1) completely define the shape and dispersion of the Student's t-distribution. Low df means heavier tails."
      },
      {
        question: "Which of the following is a primary characteristic of Snedecor's F-distribution?",
        options: [
          "It is perfectly symmetric about 0.",
          "It only takes positive real values and is right-skewed.",
          "It is a discrete probability function.",
          "Its tails are capped at 3 standard deviations."
        ],
        correctIndex: 1,
        explanation: "Because the F-statistic is a ratio of variances, it can never be negative. The F-distribution starts at x=0, is highly skewed right, and approaches zero as x goes to infinity."
      }
    ],
    simulatedTerminalOutput: `>>> python distribution_relationships.py
--- STUDENT'S T VS. STANDARD NORMAL Z ---
Evaluating tail coordinates at typical significance targets (x = +/- 2.0)
Normal Z Curve density at x = 2.00: 0.0540

Student t Curve densities at x = 2.00:
   At df = 2  : density = 0.0684  (Thicker tails, higher risk)
   At df = 5  : density = 0.0581  (Medium)
   At df = 15 : density = 0.0551
   At df = 30 : density = 0.0544  (Converging to Normal!)

--- SNEDECOR'S F DISTRIBUTION (df1=5, df2=10) ---
Characteristics:
Domain constraint: positive x > 0
Distribution Mean (for df2 > 2) = df2 / (df2 - 2) = 1.2500
Distribution Mode (peak)         = 0.5556

Density (PDF) coordinate points:
   F(x=0.2) : density = 0.3541
   F(x=0.6) : density = 0.6980  <-- Near Mode Peak
   F(x=1.2) : density = 0.3804
   F(x=2.0) : density = 0.1554
   F(x=4.0) : density = 0.0271 (Long positive tail)

[Process completed successfully - Exit Code 0]`
  },
  "3a-z-test": {
    detailedTheory: "Hypothesis Testing is a structured framework for quantitative decision-making. The One-Sample Z-Test assesses whether a sample mean significantly deviates from a hypothesized population mean H0, assuming known population standard deviation. By scaling the standard error, we calculate the Z-statistic: Z_calc = (SampleMean - HypothesizedMean) / (PopSD / sqrt(n)). We select a significance level alpha (commonly 0.05). If calculated Z exceeds critical Z parameters (+/- 1.96 for two-tailed tests at 5%), or if the resulting p-value is less than alpha, we reject the Null Hypothesis and embrace the Alternative Hypothesis.",
    realWorldApplication: "Biomedical regulators test if average dosage tablets conform to standard mass limits using Z-test validation models.",
    stepByStepAlgorithm: [
      "State Null Hypothesis H0 (e.g., Mean = 1600) and Alternative Hypothesis H1.",
      "Input Sample Mean, known Population SD, Sample size n, and alpha scale.",
      "Calculate Standard Error of Mean: SE = SD / sqrt(n).",
      "Solve calculated Z-stat. Obtain two-tailed p-value using the standard Gaussian CDF subtraction.",
      "Evaluate statistical verdict: reject H0 if p-value <= alpha, otherwise fail to reject H0."
    ],
    homeworkQuestions: [
      "A factory produces lightbulbs with mean life of 1600 hours and SD of 120. A sample of 50 bulbs has mean life of 1570 hours. Test at 5% significance level if mean life has decreased.",
      "Define Type I and Type II errors and explain their relationships to alpha."
    ],
    interactiveQuiz: [
      {
        question: "When is a Z-test preferred over a t-test?",
        options: [
          "When the sample size is extremely small (< 10)",
          "When the population standard deviation is known and the sample is large",
          "When we don't know anything about population characteristics",
          "When variables are qualitative"
        ],
        correctIndex: 1,
        explanation: "The Z-test is mathematically valid when indeed the population standard deviation is known and/or the sample size is large (n >= 30)."
      },
      {
        question: "If we obtain a p-value of 0.021 for a test at significance level alpha = 0.05, what is our statistical verdict?",
        options: [
          "Reject the Null Hypothesis",
          "Fail to reject the Null Hypothesis",
          "Increase the sample size immediately",
          "Hypothesis tests are inconclusive"
        ],
        correctIndex: 0,
        explanation: "Because the p-value (0.021) is less than the threshold alpha (0.05), the observed data is highly unlikely under H0, leading us to reject the Null Hypothesis."
      }
    ],
    simulatedTerminalOutput: `>>> python hypothesis_z_test.py
--- TESTING PARAMETERS SETUP ---
Null Hypothesis (H0)     : Population Mean μ = 1600.0
Alternative Hyp (H1)     : Population Mean μ != 1600.0 (Two-tailed)
Significance level (α)   : 0.05

--- OBSERVED SAMPLE METRICS ---
Sample Size (n)          : 50
Observed Sample Mean (x) : 1570.0
Population Std Dev (σ)   : 120.0

--- MATHEMATICAL VERIFICATION ---
Standard Error (SE) = σ / sqrt(n)
                    = 120.0 / sqrt(50) = 16.97056

Calculated Z-statistic:
Z = (Sample Mean - H0 Mean) / SE
  = (1570.0 - 1600.0) / 16.97056
  = -1.7678

Calculated P-value (Two-tailed):
p = 2 * (1 - CDF(|Z|))
  = 2 * (1 - 0.96145) = 0.0771

Critical values for α=0.05 (Two-tailed):
Z_critical = +/- 1.9600

--- EVALUATION VERDICT ---
Observed |Z_calc| = 1.7678 < Z_critical = 1.9600
P-value = 0.0771 >= α = 0.05

DECISION: FAIL TO REJECT the Null Hypothesis (H0).
The deviation of sample mean is not statistically significant.

[Process completed successfully - Exit Code 0]`
  },
  "4b-transition-prob": {
    detailedTheory: "A discrete Markov Chain is a stochastic process that transitions from state to state over integer time increments. It complies with the Markov Property: the probability of transitioning to future states depends exclusively on the current state, completely oblivious to historical trajectory paths (memoryless property). The transition pathways are formalized in a square matrix P where cell P_ij defines the probability of moving from state i to state j. Because of row constraints, every row in transition matrix P must sum to exactly 1.0. The state distribution at step n is computed recursively as: X_n = X_(n-1) * P = X_0 * P^n.",
    realWorldApplication: "Weather sequence calculations solve high-level configurations of successive rain/cloud/sun transitions.",
    stepByStepAlgorithm: [
      "Input starting state probability distribution vector X_0.",
      "Input square stochastic transition matrix P.",
      "For step n, compute matrix power P^n.",
      "Multiply X_0 by P^n to secure state distributions coordinates at the desired step."
    ],
    homeworkQuestions: [
      "Define state transition matrices. Why must every row sum up to exactly 1.0?",
      "For a transition matrix P = [[0.8, 0.2], [0.4, 0.6]], calculate state vectors X_1 and X_2 if initial distribution is [1.0, 0.0]."
    ],
    interactiveQuiz: [
      {
        question: "What is the primary characteristic of a stochastic transition matrix's rows?",
        options: [
          "Every column must sum to 1.0",
          "Every row must sum to exactly 1.0",
          "Diagonal entries must be greater than 1",
          "Det of transition matrix must equal 0"
        ],
        correctIndex: 1,
        explanation: "Each row of a transition matrix represents all possible outbound transition probabilities from that row's state; hence, they must sum to 1.0 (100%)."
      },
      {
        question: "What does the 'Markov Property' mathematically assert?",
        options: [
          "The future state depends on all previous past states equally.",
          "The future state depends only on the current state, independent of the past.",
          "Transitions are entirely deterministic.",
          "Markov chains can never have absorbing states."
        ],
        correctIndex: 1,
        explanation: "The Markov Property states that the future is conditionally independent of the past, given the present state (conditional memorylessness)."
      }
    ],
    simulatedTerminalOutput: `>>> python markov_chain.py
--- INITIALIZING TRASITION MATRIX P (3x3) ---
[[0.7 0.2 0.1]
 [0.3 0.4 0.3]
 [0.2 0.3 0.5]]

Transition row sums verification:
Row 1: 0.7 + 0.2 + 0.1 = 1.000 - OK
Row 2: 0.3 + 0.4 + 0.3 = 1.000 - OK
Row 3: 0.2 + 0.3 + 0.5 = 1.000 - OK

Initial State Configuration vector X_0 (Starting 100% in State 1):
X_0 = [1.000, 0.000, 0.000]

--- EVOLUTION OVER STEP-BY-STEP INCREMENTS ---
X_1 = X_0 @ P^1:
[0.7000, 0.2000, 0.1000]

X_2 = X_0 @ P^2:
[0.5700, 0.2500, 0.1800]

X_3 = X_0 @ P^3:
[0.5100, 0.2680, 0.2220]

X_5 = X_0 @ P^5:
[0.4632, 0.2798, 0.2570]

--- STEADY STATE CONVERGENCE CHECK (X_15) ---
X_15 = [0.4545, 0.2818, 0.2636]
X_16 = [0.4545, 0.2818, 0.2636]

Equilibrium distribution converged! P_stationary = [0.455, 0.282, 0.264]

[Process completed successfully - Exit Code 0]`
  },
  "4c-second-order-markov": {
    detailedTheory: "In a second-order Markov process, the probability of transitioning to state S_t depends not only on the current state S_(t-1) but also on the immediate past state S_(t-2). Mathematically: P(S_t | S_(t-1), S_(t-2), ... S_0) = P(S_t | S_(t-1), S_(t-2)). This expands the state tracking space: rather than solo states, the transition matrix maps couples (e.g., State 1 State 1, State 1 State 2, etc.) to target outcomes. This is highly useful for modelling trajectories with physical inertia, where direction from context guides the future.",
    realWorldApplication: "Predictive text keyboard algorithms select next-word candidates using previous word combinations; algorithmic trading systems track trend momentum using second-order Markov states.",
    stepByStepAlgorithm: [
      "Define state coordinates and transition indices.",
      "Input second-order probabilities mapping (S_(t-2), S_(t-1)) couples to S_t.",
      "Provide past states history triggers.",
      "Perform simulation steps generating consecutive states sequence, tracking state ratio weights to analyze patterns."
    ],
    homeworkQuestions: [
      "Explain how a second-order Markov chain with N states can be mapped back into a first-order Markov chain of N^2 states.",
      "Draft the transition probability equations for a second-order process predicting market bull/bear transitions."
    ],
    interactiveQuiz: [
      {
        question: "How many state couples are tracked in a second-order Markov chain with 2 raw states?",
        options: ["2", "4", "8", "16"],
        correctIndex: 1,
        explanation: "Each sequence relies on couples (S_t-2, S_t-1). For 2 states, possible pairs are (1,1), (1,2), (2,1), and (2,2), totaling 2^2 = 4 couples."
      },
      {
        question: "What is the primary advantage of second-order Markov models over standard first-order models?",
        options: [
          "They are easier and faster to compute on modern computers.",
          "They incorporate short-term historical trends (representing inertia/momentum).",
          "They have zero variance rates.",
          "They do not rely on probability matrices."
        ],
        correctIndex: 1,
        explanation: "By relying on the two most recent steps, second-order models can capture short-term patterns and momentum that a single-state first-order model cannot see."
      }
    ],
    simulatedTerminalOutput: `>>> python second_order_markov.py
--- SECOND-ORDER MARKOV TRAJECTORY TRACER ---
States mapped: [0: Bear (Decline), 1: Bull (Grownth)]
Defining Transition Probabilities mapping couples (S_t-2, S_t-1) to S_t:
   Couple (Bear, Bear) -> probability of moving to Bull: 0.15
   Couple (Bear, Bull) -> probability of moving to Bull: 0.45
   Couple (Bull, Bear) -> probability of moving to Bull: 0.55
   Couple (Bull, Bull) -> probability of moving to Bull: 0.82

Initial sequence states defined:
   S_0 = 1 (Bull)
   S_1 = 1 (Bull)

--- SIMULATION RUN (T = 15 STEPS) ---
Step 2 : transition from (1, 1). Rand choice -> S_2 = 1 (Bull)  [p_bull=0.82]
Step 3 : transition from (1, 1). Rand choice -> S_3 = 1 (Bull)  [p_bull=0.82]
Step 4 : transition from (1, 1). Rand choice -> S_4 = 0 (Bear)  [p_bear=0.18]
Step 5 : transition from (1, 0). Rand choice -> S_5 = 1 (Bull)  [p_bull=0.55]
Step 6 : transition from (0, 1). Rand choice -> S_6 = 0 (Bear)  [p_bear=0.55]
Step 7 : transition from (1, 0). Rand choice -> S_7 = 0 (Bear)  [p_bear=0.45]
Step 8 : transition from (0, 0). Rand choice -> S_8 = 0 (Bear)  [p_bear=0.85]
Step 9 : transition from (0, 0). Rand choice -> S_9 = 1 (Bull)  [p_bull=0.15]
Step 10: transition from (0, 1). Rand choice -> S_10= 1 (Bull)  [p_bull=0.45]
Step 11: transition from (1, 1). Rand choice -> S_11= 1 (Bull)  [p_bull=0.82]
Step 12: transition from (1, 1). Rand choice -> S_12= 1 (Bull)  [p_bull=0.82]
Step 13: transition from (1, 1). Rand choice -> S_13= 0 (Bear)  [p_bear=0.18]
Step 14: transition from (1, 0). Rand choice -> S_14= 1 (Bull)  [p_bull=0.55]

--- TRACE TRAJECTORY LOG ---
Sequence: [1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1]
Relative Frequency distribution:
  State 1 (Bull) : 10 / 15 = 66.67%
  State 0 (Bear) :  5 / 15 = 33.33%

[Process completed successfully - Exit Code 0]`
  },
  "5a-karl-pearson": {
    detailedTheory: "Correlation measures the strength and direction of linear association between two variables. The Karl Pearson Correlation Coefficient (r) scales from -1.0 (perfect negative linear correlation) through 0 (no correlation) to +1.0 (perfect positive linear correlation). Calculated mathematically as: r = Cov(X,Y) / (StdDev(X) * StdDev(Y)). If highly correlated, we fit an Ordinary Least Squares (OLS) best-fit line: Y = a + b * X, where the parameters minimize the sum of squared vertical distances (residuals) between predicted points and coordinates data.",
    realWorldApplication: "Marketing analytics assess the r-coefficient correlation between digital ad spending budgets and sales quantities.",
    stepByStepAlgorithm: [
      "Input a list of (X, Y) coordinate points.",
      "Calculate means of X and Y.",
      "Compute sums of squared differences for numerator and denominators.",
      "Solve correlation coefficient r.",
      "Determine OLS slope b = Cov(X,Y)/Var(X) and intercept a = mean(Y) - b * mean(X).",
      "Produce forecast estimates for target inputs."
    ],
    homeworkQuestions: [
      "Find Karl Pearson r for coordinates: (1,2), (2,5), (3,6). Verify if positive linear association is strong.",
      "Explain the key difference between correlation and causation."
    ],
    interactiveQuiz: [
      {
        question: "What value of Karl Pearson r indicates a perfect negative linear correlation?",
        options: ["0.0", "1.0", "-1.0", "99.9"],
        correctIndex: 2,
        explanation: "A value of r = -1.0 represents a perfect negative linear correlation, where every increase in X yields a perfectly proportional linear decrease in Y."
      },
      {
        question: "How are OLS fit parameters 'a' (intercept) and 'b' (slope) mathematically solved?",
        options: [
          "By maximizing the residual values",
          "By minimizing the Sum of Square Errors (SSE) between data and the line",
          "By taking random coordinates samples",
          "Using Gaussian elimination weights matrices"
        ],
        correctIndex: 1,
        explanation: "Ordinary Least Squares (OLS) obtains the line that minimizes the sum of squared vertical differences (errors) of the actual data points from the line."
      }
    ],
    simulatedTerminalOutput: `>>> python linear_correlation.py
--- PROCESSING BIVARIATE DATASET ---
Nodes coord grid list:
  P_1: (2.0, 55.0)
  P_2: (4.0, 62.0)
  P_3: (5.0, 70.0)
  P_4: (7.0, 78.0)
  P_5: (8.0, 85.0)
  P_6: (10.0, 90.0)
  P_7: (12.0, 95.0)

Sample count n = 7
Mean of X = 6.857
Mean of Y = 76.429

--- CORRELATION STATISTICS ---
Sum(dx*dy) = 282.571
Sum(dx²)   = 74.857
Sum(dy²)   = 1243.714

Karl Pearson Correlation r:
r = Sum(dx*dy) / sqrt(Sum(dx²) * Sum(dy²))
  = 282.571 / sqrt(74.857 * 1243.714)
  = 282.571 / 305.122 = 0.9261

Resulting evaluation: VERY STRONG POSITIVE CORRELATION (r = 0.9261)

--- OLS REGRESSION MODEL (Y = a + b*X) ---
Slope b = Sum(dx*dy) / Sum(dx²) = 282.571 / 74.857 = 3.7748
Intercept a = Mean(Y) - b * Mean(X) = 76.429 - 3.7748 * 6.857 = 50.5453

Fitted Line: Y = 50.55 + 3.775 * X

--- PREDICTION DEMONSTRATION ---
Estimating coordinate forecast for target test X = 9.00
Result: Y_pred = 50.5453 + (3.7748 * 9.0) = 84.518

[Process completed successfully - Exit Code 0]`
  },
  "5c-simple-regression": {
    detailedTheory: "Simple Linear Regression mathematically models the dependent output variable Y as a continuous function of a single independent input variable X: Y = a + b*X + epsilon (random error). The slope coefficient 'b' represents the estimated average change in Y per unit increase in X, while 'a' is the intercept (value of Y when X is zero). The model's goodness of fit is characterized by R-Squared (R²), also called the Coefficient of Determination. R² defines the proportion of total variance in Y explained by input predictor variable X.",
    realWorldApplication: "Real estate evaluators estimate home prices strictly using habitable flat size indicators.",
    stepByStepAlgorithm: [
      "Gather observations vectors X and Y.",
      "Compute intermediate sums (sum(X), sum(Y), sum(XY), sum(X^2)).",
      "Calculate the slope coefficient b and intercept a using standard closed-form formulas.",
      "Compute the R-squared index from calculated model predictions and actual data residuals."
    ],
    homeworkQuestions: [
      "Differentiate between residuals and absolute model fit errors in Linear Regression.",
      "If R² is 0.85, what does this tell you about the predictability of the dependent variable?"
    ],
    interactiveQuiz: [
      {
        question: "What does the R-squared (R²) index represent in regression models?",
        options: [
          "The absolute slope boundary",
          "The proportion of variables variation explained by the input model",
          "The covariance between X and Y",
          "The matrix determinant scaling factor"
        ],
        correctIndex: 1,
        explanation: "R-squared represents the Coefficient of Determination, expressing what percentage of the variance in the dependent variable (Y) is explained by the independent variable (X)."
      },
      {
        question: "What is an individual regression 'residual'?",
        options: [
          "The slope parameter value",
          "The vertical difference between the actual data Y and predicted Y value",
          "A scale of measurement error",
          "The standard error of the mean"
        ],
        correctIndex: 1,
        explanation: "A residual is defined as e_i = Y_actual - Y_predicted. It defines the vertical distance of a data point from the fitted regression line."
      }
    ],
    simulatedTerminalOutput: `>>> python simple_regression.py
--- SIMPLE OLS REGRESSION VERBOT --
Inputs coordinates count n = 7
Independent X vector: [ 2.  4.  5.  7.  8. 10. 12.]
Dependent Y vector  : [55. 62. 70. 78. 85. 90. 95.]

--- SOLVING LINE SURFACE (Y = a + b * X) ---
b = [n*Sum(X*Y) - Sum(X)*Sum(Y)] / [n*Sum(X²) - Sum(X)²] = 3.7748
a = Mean(Y) - b*Mean(X) = 50.5453

Solved Regression Parameters:
  Intercept (a): 50.5453
  Slope (b)    : 3.7748

--- ANALYSIS OF VARIANCE (ANOVA) METRICS ---
Sum of Squares Total (SST) = 1243.714
Sum of Squares Regression (SSR) = 1066.602
Sum of Squares Error (SSE) = 177.112

R-Squared Coefficient (R² = SSR / SST):
R² = 1066.602 / 1243.714 = 0.8576 (85.76% of variance explained)

Standard Error of Estimate: s = sqrt(SSE / (n-2)) = 5.9515

--- COMPLETE RESIDUAL DATA TABLE ---
X_val    Y_act    Y_pred    Residual
 2.0     55.00     58.10     -3.10
 4.0     62.00     65.64     -3.64
 5.0     70.00     69.42      0.58
 7.0     78.00     76.97      1.03
 8.0     85.00     80.74      4.26
10.0     90.00     88.29      1.71
12.0     95.00     95.84     -0.84

[Process completed successfully - Exit Code 0]`
  },
  "5d-multiple-regression": {
    detailedTheory: "Multiple Linear Regression models the linear relationship between a single dependent continuous dependent variable Y and multiple independent variables (X1, X2, ... Xp). It is represented by: Y = b0 + b1*X1 + b2*X2 + ... + bp*Xp. To solve for the parameter vector b, we express the system in matrix form: Y = X * b, and compute estimated vector weights using the mathematical normal equation: b = (X^T * X)^-1 * X^T * Y. Here, b0 is the intercepts constant, while other parameters present weights assuming other predictors stay static.",
    realWorldApplication: "SaaS companies estimate monthly recurring revenue coefficients based on digital trial signups, active users count, and average email clicks.",
    stepByStepAlgorithm: [
      "Set up target observations vectors Y and matrix X (including a column of ones representing intercept coefficients).",
      "Compute transpose of design matrix X^T.",
      "Calculate matrix multiplication product (X^T * X) and target product (X^T * Y).",
      "Solve inverse of product matrix utilizing 3x3 Gaussian elimination or np.linalg.inv().",
      "Compute parameter coefficients vector (b) and use them to forecast estimates."
    ],
    homeworkQuestions: [
      "Given X1, X2, and Y data vectors, write the explicit matrices needed to perform linear regression with matrices.",
      "What is multicollinearity and how does it affect multiple regression matrices?"
    ],
    interactiveQuiz: [
      {
        question: "What is the role of the column of ones appended to matrix X in multiple regression?",
        options: [
          "To scale numerical precision",
          "To compute the intercept coefficient (b0)",
          "To represent a dummy variable",
          "To make the matrix square"
        ],
        correctIndex: 1,
        explanation: "A column of ones is included in the design matrix X so that matrix multiplication computes the constant intercept (b0) along with the slope coefficients."
      },
      {
        question: "What is the standard matrix equation used to solve the parameters of multiple regression?",
        options: [
          "b = X @ Y",
          "b = (X^T @ X)^-1 @ X^T @ Y",
          "b = P @ D @ P^-1",
          "b = A @ inv(x) @ b"
        ],
        correctIndex: 1,
        explanation: "This is the mathematical normal equation which minimizes the sum of squared residuals in multiple regression using matrix multiplication."
      }
    ],
    simulatedTerminalOutput: `>>> python multiple_regression.py
--- MULTIPLE OLS MATRIX SOLVER ---
System Definition: Y = b0 + b1*X1 + b2*X2
Data Points Loaded (House Price Y vs Size X1 and Rooms X2):
  Point 1: size=100.0, rooms=2.0 -> Price Y = 200.0
  Point 2: size=150.0, rooms=3.0 -> Price Y = 280.0
  Point 3: size=120.0, rooms=2.0 -> Price Y = 230.0
  Point 4: size=180.0, rooms=4.0 -> Price Y = 340.0
  Point 5: size=140.0, rooms=3.0 -> Price Y = 270.0

Constructing Design Matrix X (including leading column of ones):
X = 
 [[  1. 100.   2.]
  [  1. 150.   3.]
  [  1. 120.   2.]
  [  1. 180.   4.]
  [  1. 140.   3.]]

Calculated Matrix Transpose product (X^T @ X):
 [[5.00e+00 6.90e+02 1.40e+01]
  [6.90e+02 9.93e+04 2.01e+03]
  [1.40e+01 2.01e+03 4.20e+01]]

Calculated Vector Product (X^T @ Y):
 [1.32e+03 1.88e+05 3.82e+03]

--- INVERTING AND SOLVING NORMAL EQUATIONS ---
Parameter weights solved b = inv(X^T @ X) @ (X^T @ Y):
  Intercept Constant (b0) = 55.4545
  Size coefficient   (b1) =  1.2273
  Rooms coefficient  (b2) =  8.1818

Fitted Equation: Price = 55.45 + 1.227*Size + 8.182*Rooms

--- FORECAST ESTIMATE PRODUCTION ---
Predicting valuation for Size = 130.0, Rooms = 3.0:
Price_pred = 55.4545 + (1.2273 * 130) + (8.1818 * 3) = 239.545

[Process completed successfully - Exit Code 0]`
  },
  "6a-lagrange": {
    detailedTheory: "Lagrange Interpolation is a sophisticated numerical method to find a unique polynomial of degree at most (n-1) that passes exactly through n known coordinate nodes (x_i, y_i). Unlike linear approximations, Lagrange does not solve coefficients directly; instead, it defines a series of Lagrange Basis Polynomials L_i(x) for each node i. Each basis polynomial satisfies the property L_i(x_j) = 1 if j=i, and 0 if j!=i. The final interpolated functional value is computed as: P(x) = sum(y_i * L_i(x)), where L_i(x) is product_over_j_not_i((x - x_j)/(x_i - x_j)).",
    realWorldApplication: "Aircraft trajectory estimation and robotic arm path styling interpolate high-precision coordinates using Lagrange functions.",
    stepByStepAlgorithm: [
      "Input vectors of coordinates (X, Y) containing n data nodes with distinct X values.",
      "Input standard target coordinate point (x) to estimate.",
      "Iterating through nodes, solve product basis factors L_i(x) = product_over_j_not_i((x-X_j)/(X_i-X_j)).",
      "Multiply each L_i(x) factor with corresponding Y_i. Sum terms together to secure estimated Y.",
      "Check accuracy."
    ],
    homeworkQuestions: [
      "For nodes (1,3), (2,8), (4,5). Write the explicit basis polynomials L0, L1, L2 and calculate Y at target x=3.",
      "What is Runge's Phenomenon in numerical interpolation, and how does it restrict high-degree Lagrange polynomials?"
    ],
    interactiveQuiz: [
      {
        question: "What is the key defining property of the ith Lagrange basis polynomial L_i(x) at node coordinate x_j?",
        options: [
          "L_i(x_j) is 1 if i = j, and 0 if i != j",
          "L_i(x_j) is always 1",
          "L_i(x_j) is 0 if i = j, and 1 if i != j",
          "L_i(x_j) represents the slope values"
        ],
        correctIndex: 0,
        explanation: "By mathematical construct, Lagrange basis L_i acts as an indicator: it evaluates to exactly 1.0 at its own node X_i, and collapses to 0.0 at all other nodes, ensuring the polynomial passes exactly through the known coordinates."
      },
      {
        question: "To interpolate exactly through n distinct data coordinate nodes, what is the maximum degree of the unique Lagrange polynomial?",
        options: ["n", "n - 1", "2n", "Degrees of freedom"],
        correctIndex: 1,
        explanation: "For n distinct nodes, there is a unique interpolating polynomial of degree at most n-1."
      }
    ],
    simulatedTerminalOutput: `>>> python lagrange_interpolation.py
--- NUMERICAL INTERPOLATION ENVIRONMENT ---
Known nodes mapped:
  Node 0: (1.0, 3.5)
  Node 1: (2.0, 8.0)
  Node 2: (3.0, 14.5)
  Node 3: (5.0, 31.0)

Target point to interpolate x_target = 4.0

--- CALCULATING LAGRANGE POLYNOMIAL FACTORS ---
Solving Basis Polynomials L_i(x) at x = 4.0:

For Node 0 (x0=1.0):
  Numerator   = (4.0-2.0)*(4.0-3.0)*(4.0-5.0) = -2.0000
  Denominator = (1.0-2.0)*(1.0-3.0)*(1.0-5.0) = -8.0000
  L_0(4.0)    = -2.0 / -8.0 = 0.25000

For Node 1 (x1=2.0):
  Numerator   = (4.0-1.0)*(4.0-3.0)*(4.0-5.0) = -3.0000
  Denominator = (2.0-1.0)*(2.0-3.0)*(2.0-5.0) = 3.0000
  L_1(4.0)     = -3.0 / 3.0 = -1.00000

For Node 2 (x2=3.0):
  Numerator   = (4.0-1.0)*(4.0-2.0)*(4.0-5.0) = -6.0000
  Denominator = (3.0-1.0)*(3.0-2.0)*(3.0-5.0) = -4.0000
  L_2(4.0)     = -6.0 / -4.0 = 1.50000

For Node 3 (x3=5.0):
  Numerator   = (4.0-1.0)*(4.0-2.0)*(4.0-3.0) = 6.0000
  Denominator = (5.0-1.0)*(5.0-2.0)*(5.0-3.0) = 24.0000
  L_3(4.0)     = 6.0 / 24.0 = 0.25000

--- ACCUMULATING PRODUCT TERMS ---
Term 0: L_0(x) * Y_0 = 0.2500 * 3.5 = 0.8750
Term 1: L_1(x) * Y_1 = -1.0000 * 8.0 = -8.0000
Term 2: L_2(x) * Y_2 = 1.5000 * 14.5 = 21.7500
Term 3: L_3(x) * Y_3 = 0.2500 * 31.0 = 7.7500

Interpolated Estimate P(4.0) = Sum(Terms)
                             = 0.8750 - 8.0000 + 21.7500 + 7.7500
                             = 22.37500

Estimated Y at target x=4.0: 22.37500

[Process completed successfully - Exit Code 0]`
  }
};
