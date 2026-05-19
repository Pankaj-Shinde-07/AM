export interface PracticalItem {
  id: string;
  category: string;
  code: string;
  theory: string;
  formula: string;
  title: string;
  practicalNum: string;
  aim: string;
  inputsDesc: string;
  outputsDesc: string;
}

export const PRACTICALS: PracticalItem[] = [
  // --- PRACTICAL 1: LINEAR ALGEBRA ---
  {
    id: "1a-matrix-ops",
    category: "Linear Algebra",
    practicalNum: "1A",
    title: "Matrix Operations",
    aim: "Perform matrix addition, multiplication, and scalar operations in Python using NumPy.",
    formula: "Addition: C = A + B (where C_ij = A_ij + B_ij)\nScalar Multiplication: B = k * A (where B_ij = k * A_ij)\nMatrix Multiplication: C = A @ B (where C_ij = sum(A_ik * B_kj))",
    theory: "Matrix operations form the core of linear algebra. Addition requires matrices to be of identical dimensions (m x n). Matrix multiplication requires the number of columns in the first matrix to equal the number of rows in the second matrix (dimension matching: (m x n) x (n x p) -> (m x p)). Scalar multiplication scales every individual element of a matrix by a constant factor k.",
    inputsDesc: "Two dimensions-compatible matrices (A and B), and a scalar multiplier factor (k).",
    outputsDesc: "The result of matrix addition (A + B), scalar multiplication (k * A), and matrix multiplication (A x B).",
    code: `import numpy as np

def perform_matrix_operations():
    # Define matrices A and B (3x3)
    A = np.array([
        [2, 4, -1],
        [3, 0, 8],
        [-2, 5, 1]
    ], dtype=float)
    
    B = np.array([
        [1, -2, 3],
        [0,  5, 2],
        [4, -1, 0]
    ], dtype=float)
    
    k = 3.5  # Scalar factor
    
    print("--- INPUT MATRICES ---")
    print("Matrix A:\\n", A)
    print("\\nMatrix B:\\n", B)
    print(f"\\nScalar k: {k}")
    
    print("\\n--- 1. MATRIX ADDITION (A + B) ---")
    if A.shape == B.shape:
        addition_result = A + B
        print(addition_result)
    else:
        print("Error: Dimensions must be identical for matrix addition!")
        
    print("\\n--- 2. SCALAR MULTIPLICATION (k * A) ---")
    scalar_result = k * A
    print(scalar_result)
    
    print("\\n--- 3. MATRIX MULTIPLICATION (A @ B) ---")
    if A.shape[1] == B.shape[0]:
        multiplication_result = A @ B  # Can also use np.dot(A, B)
        print(multiplication_result)
    else:
        print("Error: Inner dimensions must match for matrix multiplication!")

if __name__ == "__main__":
    perform_matrix_operations()
`
  },
  {
    id: "1b-eigen",
    category: "Linear Algebra",
    practicalNum: "1B",
    title: "Eigenvalues, Eigenvectors & Diagonalization",
    aim: "Compute eigenvalues/eigenvectors and diagonalize a square matrix in Python.",
    formula: "Characteristic Equation: det(A - λI) = 0 (Eigenvalues λ)\nEigenvector relation: A * v = λ * v\nDiagonalization: D = P^-1 * A * P (where P is modal matrix of eigenvectors, D is diagonal eigenvalue matrix)",
    theory: "An eigenvector of a square matrix A is a non-zero vector v such that multiplying A by v scales it by a factor λ (the eigenvalue). If a matrix A of size n x n has n linearly independent eigenvectors, we can construct the modal matrix P (with columns as eigenvectors) and a diagonal matrix D (eigenvalues on the diagonal) such that A = P * D * P^-1. This process is called diagonalization.",
    inputsDesc: "Any square matrix A (typically 2x2 or 3x3).",
    outputsDesc: "Computed eigenvalues, corresponding normalized eigenvectors, modal matrix P, diagonalized matrix D, and proof verification P * D * P^-1.",
    code: `import numpy as np

def diagonalize_matrix():
    # Define a 3x3 diagonalizable square matrix
    A = np.array([
        [4, 2, 0],
        [2, 4, 0],
        [0, 0, 5]
    ], dtype=float)
    
    print("Matrix A:\\n", A)
    
    # Calculate eigenvalues and eigenvectors
    eigenvalues, eigenvectors = np.linalg.eig(A)
    
    print("\\n--- EIGENVALUES ---")
    for i, lam in enumerate(eigenvalues):
        print(f"λ_{i+1} = {lam:.4f}")
        
    print("\\n--- EIGENVECTORS (Columns of modal matrix P) ---")
    print(eigenvectors)
    
    # Diagonalization process
    # P is the modal matrix containing eigenvectors as columns
    P = eigenvectors
    
    # Try with inverse of P
    try:
        P_inv = np.linalg.inv(P)
        
        # Calculate diagonal matrix D = P^-1 * A * P
        D = P_inv @ A @ P
        
        print("\\n--- MODAL MATRIX P ---")
        print(P)
        
        print("\\n--- DIAGONAL MATRIX D (P^-1 @ A @ P) ---")
        # Use np.round to clean up small scientific notations like 1e-16
        print(np.round(D, decimals=6))
        
        # Verification: P @ D @ P^-1 should equal A
        A_reconstructed = P @ D @ P_inv
        print("\\n--- VERIFICATION (P @ D @ P^-1) ---")
        print(np.round(A_reconstructed, decimals=4))
        
        is_equal = np.allclose(A, A_reconstructed)
        print(f"\\nDoes reconstructed matrix equal original? {is_equal}")
        
    except np.linalg.LinAlgError:
        print("\\nError: Matrix P is singular! The matrix A is not diagonalizable (doesn't have n linearly independent eigenvectors).")

if __name__ == "__main__":
    diagonalize_matrix()
`
  },
  {
    id: "1c-gaussian",
    category: "Linear Algebra",
    practicalNum: "1C",
    title: "Gaussian Elimination from Scratch",
    aim: "Implement the Gaussian Elimination method with partial pivoting from scratch to solve Ax = b systems of linear equations.",
    formula: "Augmented Matrix matrix: [A | b]\nForward Elimination Row operations: R_i = R_i - (a_ik / a_kk) * R_k\nBackward Substitution: x_i = (b_i - sum(a_ij * x_j)) / a_ii",
    theory: "Gaussian elimination is an algorithm for solving systems of linear equations. It has two main stages: Forward Elimination, which converts the system into upper triangular form (row echelon form) using row operations, and Back Substitution, which determines values of variables starting from the last row. To prevent division-by-zero or numerical instability, 'Partial Pivoting' is applied: swapping current row with the row having the largest absolute pivot value.",
    inputsDesc: "Coefficient square matrix A (size n x n) and right-hand side column vector b (size n).",
    outputsDesc: "Upper triangular augmented matrix and the final solved solution vector x.",
    code: `import numpy as np

def gaussian_elimination(A_mat, b_vec):
    n = len(b_vec)
    # Create the augmented matrix [A | b] using float values
    M = np.hstack([A_mat.astype(float), b_vec.reshape(-1, 1).astype(float)])
    print("Initial Augmented Matrix [A | b]:")
    print(M)
    
    # Forward Elimination
    for i in range(n):
        # 1. Partial Pivoting: Find the row with largest value in current column
        max_row = i + np.argmax(abs(M[i:, i]))
        if max_row != i:
            M[[i, max_row]] = M[[max_row, i]]
            print(f"\\nRow swap R_{i+1} <-> R_{max_row+1} (pivoting on column {i+1})")
            print(M)
            
        pivot = M[i, i]
        if abs(pivot) < 1e-12:
            raise ValueError("System has no unique solution (singular matrix)!")
            
        # 2. Eliminate entries below pivot
        for j in range(i + 1, n):
            factor = M[j, i] / pivot
            M[j, i:] -= factor * M[i, i:]
            print(f"\\nRow operation R_{j+1} -> R_{j+1} - ({factor:.3f}) * R_{i+1}:")
            print(np.round(M, 4))
            
    # Back Substitution
    x = np.zeros(n)
    for i in range(n - 1, -1, -1):
        x[i] = (M[i, -1] - np.dot(M[i, i+1:n], x[i+1:n])) / M[i, i]
        
    return x

# Test the function
if __name__ == "__main__":
    # System of 3 equations:
    # 2x + Case 1y - z = 8
    # -3x - y + 2z = -11
    # -2x + y + 2z = -3
    A = np.array([
        [2, 1, -1],
        [-3, -1, 2],
        [-2, 1, 2]
    ])
    b = np.array([8, -11, -3])
    
    try:
        sol = gaussian_elimination(A, b)
        print("\\nFinal Calculated Solution Vector [x, y, z]:")
        for i, val in enumerate(sol):
            print(f"x_{i+1} = {val:.4f}")
    except ValueError as e:
        print(f"Error: {e}")
`
  },

  // --- PRACTICAL 2: PROBABILITY DISTRIBUTIONS ---
  {
    id: "2a-distribs",
    category: "Probability Distributions",
    practicalNum: "2A",
    title: "Discrete & Continuous Variables",
    aim: "Demonstrate Discrete and Continuous Random Variables using Binomial and Normal Distributions in SciPy.",
    formula: "Binomial PMF: P(X = k) = C(n, k) * p^k * (1 - p)^(n - k)\nNormal PDF: f(x) = (1 / (σ * sqrt(2π))) * e^(-0.5 * ((x - μ) / σ)^2)",
    theory: "Discrete random variables take on countably distinct values (e.g., number of heads). The Binomial Distribution modeling n Bernoulli trials with probability of success p represents this. Continuous random variables take on any real value in an interval. The Normal (Gaussian) Distribution modeling parameters mean μ and standard deviation σ is the classic continuous archetype.",
    inputsDesc: "Parameters for both distributions (Binomial: n, p; Normal: mean μ, standard deviation σ).",
    outputsDesc: "Computed probabilities, mean, variance, and standard deviation together with descriptive evaluation.",
    code: `import numpy as np
import scipy.stats as stats
import matplotlib.pyplot as plt

def demonstrate_distributions():
    # 1. DISCRETE: Binomial Distribution
    n = 10   # Number of independent trials
    p = 0.6  # Probability of success in each trial
    binom_dist = stats.binom(n, p)
    
    print("=== DISCRETE: BINOMIAL DISTRIBUTION (n=10, p=0.6) ===")
    print(f"Mean: {binom_dist.mean():.4f}")
    print(f"Variance: {binom_dist.var():.4f}")
    
    # Calculate PMF for discrete values
    for k in [3, 5, 8]:
        pmf_val = binom_dist.pmf(k)
        print(f"P(X = {k}) [Probability of exactly {k} successes]: {pmf_val:.4f}")
    
    # Calculate CDF (Cumulative Probability)
    cdf_val = binom_dist.cdf(5)
    print(f"P(X <= 5) [Cumulative probability of <= 5 successes]: {cdf_val:.4f}")
    
    # 2. CONTINUOUS: Normal Distribution
    mu = 50      # Population Mean
    sigma = 10   # Standard Deviation
    norm_dist = stats.norm(mu, sigma)
    
    print("\\n=== CONTINUOUS: NORMAL DISTRIBUTION (μ=50, σ=10) ===")
    print(f"Mean: {norm_dist.mean():.4f}")
    print(f"Variance: {norm_dist.var():.4f}")
    
    # Calculate PDF (Density at x)
    pdf_val = norm_dist.pdf(50)
    print(f"Probability Density at mean x=50: {pdf_val:.4f}")
    
    # Calculate CDF (Probability up to x)
    cdf_norm = norm_dist.cdf(60)
    print(f"P(X <= 60) [Probability score is below 60]: {cdf_norm:.4f}")
    
    # Calculate descriptive interval (68-95-99.7 rule)
    p_within_1_sd = norm_dist.cdf(mu + sigma) - norm_dist.cdf(mu - sigma)
    print(f"Probability within 1 Standard Deviation [μ - σ, μ + σ]: {p_within_1_sd:.4f}")

if __name__ == "__main__":
    demonstrate_distributions()
`
  },
  {
    id: "2b-joint-pmf",
    category: "Probability Distributions",
    practicalNum: "2B",
    title: "Joint Probability Mass Function (PMF)",
    aim: "Implement joint PMF check, marginal PMFs, Expectations, Covariance, and independence.",
    formula: "Marginal PMFs: P_X(x) = Sum_y(P(x, y)), P_Y(y) = Sum_x(P(x, y))\nExpected value: E[X] = Sum(x * P_X(x))\nCovariance: Cov(X, Y) = E[XY] - E[X]E[Y]\nIndependence check: P(X=x, Y=y) = P_X(x) * P_Y(y) for all (x, y)",
    theory: "A Joint PMF describes the probability distribution of two discrete random variables X and Y simultaneously. Summing along the columns gives the marginal distribution of X, while summing along the rows gives the marginal distribution of Y. Covariance measures how the variables vary together. If the covariance is zero, it does not guarantee independence, but if the variables are independent, then Cov(X, Y) is guaranteed to be 0 and the joint probability table is the outer product of marginal tables.",
    inputsDesc: "A 2D matrix representing the probabilities associated with combinations of X and Y values.",
    outputsDesc: "Marginal probability vectors, Expected values, Covariance, and a clear verdict on statistical independence.",
    code: `import numpy as np

def analyze_joint_pmf():
    # Define discrete values for random variables X and Y
    X_vals = np.array([1, 2, 3])
    Y_vals = np.array([10, 20])
    
    # Joint probabilities table (Rows = X, Columns = Y)
    # Dimensions: 3 rows (X=1, 2, 3) x 2 columns (Y=10, 20)
    joint_pmf = np.array([
        [0.1, 0.2],  # X=1, Y=10 and X=1, Y=20
        [0.15, 0.25], # X=2, Y=10 and X=2, Y=20
        [0.2, 0.1]   # X=3, Y=10 and X=3, Y=20
    ])
    
    # 1. Validate PMF (sums to 1.0)
    total_prob = np.sum(joint_pmf)
    print(f"Total probability sum: {total_prob:.4f}")
    if not np.isclose(total_prob, 1.0):
        print("Error: The joint PMF does not sum to 1.0!")
        return
        
    # 2. Compute Marginal PMFs
    marginal_X = np.sum(joint_pmf, axis=1) # Sum over Y
    marginal_Y = np.sum(joint_pmf, axis=0) # Sum over X
    
    print("\\n--- MARGINAL DISTRIBUTIONS ---")
    for x, p in zip(X_vals, marginal_X):
        print(f"P_X(X = {x}) = {p:.4f}")
    print()
    for y, p in zip(Y_vals, marginal_Y):
        print(f"P_Y(Y = {y}) = {p:.4f}")
        
    # 3. Compute Expectations (E[X], E[Y], E[XY])
    E_X = np.sum(X_vals * marginal_X)
    E_Y = np.sum(Y_vals * marginal_Y)
    
    E_XY = 0
    for i, x in enumerate(X_vals):
        for j, y in enumerate(Y_vals):
            E_XY += x * y * joint_pmf[i, j]
            
    # 4. Compute Covariance
    cov_XY = E_XY - (E_X * E_Y)
    
    print("\\n--- EXPECTED VALUES & COVARIANCE ---")
    print(f"E[X]  = {E_X:.4f}")
    print(f"E[Y]  = {E_Y:.4f}")
    print(f"E[XY] = {E_XY:.4f}")
    print(f"Cov(X, Y) = {cov_XY:.4f}")
    
    # 5. Check for Independence
    # P(X=x, Y=y) should equal P_X(x) * P_Y(y) for all indices
    independent = True
    for i, x in enumerate(X_vals):
        for j, y in enumerate(Y_vals):
            p_joint = joint_pmf[i, j]
            p_expected = marginal_X[i] * marginal_Y[j]
            if not np.isclose(p_joint, p_expected):
                independent = False
                
    print("\\n--- INDEPENDENCE CHECK ---")
    if independent:
        print("Verdict: X and Y are mathematically Independent!")
    else:
        print("Verdict: X and Y are Dependent (P(X, Y) != P(X) * P(Y)).")

if __name__ == "__main__":
    analyze_joint_pmf()
`
  },
  {
    id: "2c-clt",
    category: "Probability Distributions",
    practicalNum: "2C",
    title: "Central Limit Theorem (CLT)",
    aim: "Demonstrate the Central Limit Theorem: take sample means from standard skewed distributions and plot their normal-conforming distribution.",
    formula: "Sample Mean: x_bar = sum(x_i) / n\nAs n -> infinity, x_bar ~ Normal(μ, σ^2 / n)",
    theory: "The Central Limit Theorem (CLT) states that, given a sufficiently large sample size n from a population with a finite level of variance, the distribution of the sample means will behave approximately like a Normal Distribution, regardless of the population's underlying distribution (e.g., highly right-skewed Exponential, or Uniform). Standard threshold for 'sufficiently large' is typically n >= 30.",
    inputsDesc: "Parent distribution type (Uniform, Exponential, Poisson), sample size (n), and number of simulation runs (N).",
    outputsDesc: "A Normal-looking histogram of sample means and statistics displaying convergence.",
    code: `import numpy as np
import scipy.stats as stats
import matplotlib.pyplot as plt

def central_limit_theorem_simulation():
    # Configuration
    parent_dist_type = "exponential"  # We pull from highly skewed distribution
    sample_size = 40                  # n: size of each sample
    num_samples = 1000                # N: number of times we sample
    
    print(f"Simulating Central Limit Theorem with {parent_dist_type} distribution")
    print(f"Sample size (n) = {sample_size}, Number of trials (N) = {num_samples}\\n")
    
    # Store sample means
    sample_means = []
    
    # Run the sampling simulation
    for _ in range(num_samples):
        if parent_dist_type == "exponential":
            # Parent Exponential: Mean = 1.0, Var = 1.0 (highly skewed right)
            sample = np.random.exponential(scale=1.0, size=sample_size)
        elif parent_dist_type == "uniform":
            # Parent Uniform [0, 1]: Mean = 0.5, Var = 1/12
            sample = np.random.uniform(low=0.0, high=1.0, size=sample_size)
        else:
            # Poisson with lambda = 4.0
            sample = np.random.poisson(lam=4.0, size=sample_size)
            
        sample_means.append(np.mean(sample))
        
    sample_means = np.array(sample_means)
    
    # Calculate statistics
    sim_mean = np.mean(sample_means)
    sim_std = np.std(sample_means)
    
    print("--- SIMULATION STATISTICS ---")
    print(f"Mean of Sample Means: {sim_mean:.4f}")
    print(f"Standard Deviation of Sample Means (Standard Error): {sim_std:.4f}")
    
    # Plotting using matplotlib
    plt.figure(figsize=(8, 5))
    count, bins, ignored = plt.hist(sample_means, bins=30, density=True, alpha=0.6, color='g', edgecolor='black')
    
    # Fit corresponding normal curve
    xmin, xmax = plt.xlim()
    x = np.linspace(xmin, xmax, 100)
    p = stats.norm.pdf(x, sim_mean, sim_std)
    plt.plot(x, p, 'r-', linewidth=2, label='Normal Fit')
    
    plt.title(f"CLT Simulation: n={sample_size}, N={num_samples} ({parent_dist_type.capitalize()} Source)")
    plt.xlabel("Sample Means")
    plt.ylabel("Probability Density")
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    print("\\n[Note: Matplotlib graph plotted and saved successfully in local environments!]")
    # plt.savefig('clt_simulation.png')
    # plt.close()

if __name__ == "__main__":
    central_limit_theorem_simulation()
`
  },
  {
    id: "2d-t-f-z-distribs",
    category: "Probability Distributions",
    practicalNum: "2D",
    title: "t, F, & Standard Normal (Z) Distributions",
    aim: "Generate, plot, and analyze probability density and compare Student's t, Snedecor's F, and Standard Normal (Z) distributions.",
    formula: "Z Distribution (Standard Normal): Mean = 0, SD = 1\nStudent's t Distribution: parameter df (approaches Z as df -> infinity)\nF Distribution: parameters df1, df2 (ratio of two normalized Chi-squared variables)",
    theory: "These three continuous distributions form the baseline for parametric statistical hypothesis testing. The Z-distribution represents the Standard Normal curve. Student's t-distribution is symmetric and bell-shaped like Z, but has thicker, heavier tails to account for uncertainty in small samples (with degrees of freedom 'df'). The F-distribution is right-skewed and represents the ratio of variances of two independent populations, heavily utilized in ANOVA testing.",
    inputsDesc: "Degrees of freedom for t (df), degrees of freedom for F (df1, df2), and a range of x values.",
    outputsDesc: "Probability density values, comparative statistics, and graph comparison thresholds.",
    code: `import numpy as np
import scipy.stats as stats
import matplotlib.pyplot as plt

def generate_continuous_distributions():
    x_range = np.linspace(-4, 4, 200)
    
    # 1. Standard Normal Z
    z_pdf = stats.norm.pdf(x_range, 0, 1)
    
    # 2. Student's t with small df (e.g., df=3) and medium df (df=15)
    t_pdf_3 = stats.t.pdf(x_range, df=3)
    t_pdf_15 = stats.t.pdf(x_range, df=15)
    
    print("--- SYMMETRY ANALYSIS ---")
    print(f"Z-dist PDF at x=1.5: {stats.norm.pdf(1.5, 0, 1):.4f}")
    print(f"t-dist (df=3) PDF at x=1.5: {stats.t.pdf(1.5, df=3):.4f}")
    print(f"t-dist (df=15) PDF at x=1.5: {stats.t.pdf(1.5, df=15):.4f}")
    print("[Observe how increasing degrees of freedom makes the t-pdf closer to the Z-pdf!]")
    
    # 3. F-Distribution (Only defined for x > 0)
    x_range_f = np.linspace(0.01, 5, 200)
    f_pdf_1 = stats.f.pdf(x_range_f, dfn=5, dfd=10) # Numerator df=5, Denominator df=10
    f_pdf_2 = stats.f.pdf(x_range_f, dfn=20, dfd=20)
    
    print("\\n--- F-DISTRIBUTION PEAK COMPARISON ---")
    print(f"F-dist (5, 10) peak coordinate: x=1.0 -> Density: {stats.f.pdf(1.0, 5, 10):.4f}")
    print(f"F-dist (20, 20) peak coordinate: x=1.0 -> Density: {stats.f.pdf(1.0, 20, 20):.4f}")
    
    # Plotting code representation
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))
    
    # Subplot 1: Z vs Student's t
    ax1.plot(x_range, z_pdf, 'g-', label='Standard Z', linewidth=2)
    ax1.plot(x_range, t_pdf_3, 'r--', label='t-dist (df=3)')
    ax1.plot(x_range, t_pdf_15, 'b-.', label='t-dist (df=15)')
    ax1.set_title("Student's t vs Standard Normal Z")
    ax1.set_xlabel("x value")
    ax1.set_ylabel("Probability Density")
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    
    # Subplot 2: F Distribution
    ax2.plot(x_range_f, f_pdf_1, 'purple', label='F-dist (dfn=5, dfd=10)', linewidth=2)
    ax2.plot(x_range_f, f_pdf_2, 'orange', label='F-dist (dfn=20, dfd=20)', linewidth=2)
    ax2.set_title("Snedecor's F Distribution Profiles")
    ax2.set_xlabel("x value")
    ax2.set_ylabel("Probability Density")
    ax2.legend()
    ax2.grid(True, alpha=0.3)
    
    plt.tight_layout()
    print("\\nPlots configured successfully. Ready to render in UI chart canvas!")

if __name__ == "__main__":
    generate_continuous_distributions()
`
  },

  // --- PRACTICAL 3: HYPOTHESIS TESTING ---
  {
    id: "3a-z-test",
    category: "Hypothesis Testing",
    practicalNum: "3A",
    title: "Large Sample Single Mean Z-Test",
    aim: "Perform a Large Sample Hypothesis Test for a Single Mean (Z-test) to evaluate claim validity.",
    formula: "Null Hypothesis H0: μ = μ0\nAlternate Hypothesis H1: μ != μ0 (Two-tailed)\nZ statistic: Z_calc = (x_bar - μ0) / (σ / sqrt(n))\np-value = 2 * (1 - norm.cdf(|Z_calc|))",
    theory: "A Z-test is applicable for large sample sizes (generally n >= 30) where the population standard deviation σ is known or can be reliably substituted by the sample standard deviation. If the calculated probability (p-value) is smaller than the chosen significance level α (frequently 0.05 or 5%), we reject the Null Hypothesis in favor of the Alternative Hypothesis. Otherwise, we fail to reject the null hypothesis.",
    inputsDesc: "Hypothesized population mean (μ0), sample mean (x_bar), standard deviation (σ), sample size (n), and significance level (α).",
    outputsDesc: "Calculated Z-statistic, p-value, critical bounds, and the final hypothesis rejection verdict.",
    code: `import numpy as np
import scipy.stats as stats

def single_mean_z_test(pop_mean_h0, sample_mean, std_dev, sample_size, alpha=0.05, alternative="two-sided"):
    print("=== HYPOTHESIS LABELS ===")
    print(f"H0: Population Mean μ = {pop_mean_h0}")
    print(f"H1: Population Mean μ != {pop_mean_h0} ({alternative})")
    
    # Calculate Z standard error
    std_error = std_dev / np.sqrt(sample_size)
    
    # Calculate Z test statistic
    z_stat = (sample_mean - pop_mean_h0) / std_error
    
    print(f"\\nCalculated Sample Mean (x_bar): {sample_mean}")
    print(f"Standard Error (SE): {std_error:.4f}")
    print(f"Calculated Z-Statistic: {z_stat:.4f}")
    
    # Calculate critical values and p-values based on test type
    if alternative == "two-sided":
        critical_z = stats.norm.ppf(1 - alpha / 2)
        p_value = 2 * (1 - stats.norm.cdf(abs(z_stat)))
        print(f"Critical Z bounds: +/- {critical_z:.4f}")
        reject = abs(z_stat) > critical_z
    elif alternative == "greater":
        critical_z = stats.norm.ppf(1 - alpha)
        p_value = 1 - stats.norm.cdf(z_stat)
        print(f"Critical Z bound: + {critical_z:.4f}")
        reject = z_stat > critical_z
    else: # less
        critical_z = stats.norm.ppf(alpha)
        p_value = stats.norm.cdf(z_stat)
        print(f"Critical Z bound: - {abs(critical_z):.4f}")
        reject = z_stat < critical_z
        
    print(f"p-Value: {p_value:.6f}")
    print(f"Alpha Significance Level: {alpha}")
    
    print("\\n--- VERDICT ---")
    if reject:
        print(f"Decision: REJECT the Null Hypothesis H0 in favor of H1.")
        print("Reasoning: Calculated result is statistically highly significant.")
    else:
        print(f"Decision: FAIL TO REJECT the Null Hypothesis H0.")
        print("Reasoning: Insufficient sample evidence to dispute H0.")
        
    return z_stat, p_value, reject

# Run sample test
if __name__ == "__main__":
    # Example: A manufacturer claims lightbulbs last μ = 1600 hours on average.
    # An audit of 50 bulbs (n=50) shows an average life x_bar = 1570 hours
    # with standard deviation s = 120. Test at 5% significance level.
    single_mean_z_test(
        pop_mean_h0=1600,
        sample_mean=1570,
        std_dev=120,
        sample_size=50,
        alpha=0.05
    )
`
  },

  // --- PRACTICAL 4: STOCHASTIC PROCESSES & MARKOV CHAINS ---
  {
    id: "4b-transition-prob",
    category: "Stochastic Processes",
    practicalNum: "4B",
    title: "n-Step Transition Probability Matrix",
    aim: "Calculate the n-step transition probability matrix for a discrete-time Markov Chain.",
    formula: "n-Step Transition Matrix: P^(n) = P^n (matrix power of the single-step transition matrix)\nState probability vector: v(n) = v(0) * P^n",
    theory: "In a Markov chain, a transition matrix P governs transitions between states in a single integer step. The Chapman-Kolmogorov equations show that the transition probability from state i to state j in exactly n steps is the (i, j)-th entry of the matrix power P^n. For any starting probability distribution over states v(0), the state distribution after n periods is given by the matrix multiplication v(0) @ P^n.",
    inputsDesc: "A valid square row-stochastic transition probability matrix P (rows sum to 1.0), and number of steps (n).",
    outputsDesc: "Computed transition matrix power P^n showing state probability distributions.",
    code: `import numpy as np

def calculate_n_step_transition():
    # Define a 3-state transition matrix P (representing Sunny, Cloudy, Rainy weather)
    # Rows must sum to exactly 1.0!
    P = np.array([
        [0.7, 0.2, 0.1],  # From Sunny
        [0.3, 0.4, 0.3],  # From Cloudy
        [0.2, 0.3, 0.5]   # From Rainy
    ])
    
    steps = 4  # Find 4-step probabilities (P^4)
    
    print("--- 1-STEP TRANSITION MATRIX (P) ---")
    print(P)
    
    # Ensure rows sum to 1
    row_sums = np.sum(P, axis=1)
    print("\\nRow Sums validation:", row_sums)
    if not np.allclose(row_sums, 1.0):
        print("Warning: Transition Matrix is not row-stochastic!")
        
    # Calculate P^n using linear algebra matrix power
    P_n = np.linalg.matrix_power(P, steps)
    
    print(f"\\n--- {steps}-STEP TRANSITION MATRIX (P^{steps}) ---")
    print(np.round(P_n, decimals=5))
    
    # Calculate state distribution if starting in Sunny weather (vector [1, 0, 0])
    v_0 = np.array([1.0, 0.0, 0.0])
    v_n = v_0 @ P_n
    
    print(f"\\nAssuming initial state distribution v_0 = {v_0}")
    print(f"State distribution after {steps} steps = {np.round(v_n, decimals=5)}")

if __name__ == "__main__":
    calculate_n_step_transition()
`
  },
  {
    id: "4c-second-order-markov",
    category: "Stochastic Processes",
    practicalNum: "Extra-4C",
    title: "Second-order Markov Process",
    aim: "Implement and simulate a Second-order Markov chain, where the transition depends on both the immediate previous state and the state before that.",
    formula: "P(X_t = j | X_t-1 = i_1, X_t-2 = i_2) = p_i2_i1_j\nRepresented by an equivalent first-order transition on state pairs: (i_2, i_1) -> (i_1, j)",
    theory: "In a second-order Markov process, the probability of transitioning to state X_t depends not only on the current state X_{t-1} but also on the previous state X_{t-2}. Mathematically, P(X_t | X_{t-1}, ..., X_0) = P(X_t | X_{t-1}, X_{t-2}). This can be transformed into a first-order Markov chain by redefining the state space as ordered tuples of pairs representing: (state_t-2, state_t-1).",
    inputsDesc: "Previous states tuple (Yesterday, Today), and second-order conditional probability structures.",
    outputsDesc: "Identified probability vectors for tomorrow's state predictions and simulated state traces.",
    code: `import numpy as np

def second_order_markov_transition():
    # Let states be 0: Bear, 1: Bull
    # A second order transition defines transition to next state given (State_t-2, State_t-1)
    # We define probabilities for State_t given:
    # Key index mapping:
    # 00: (Bear, Bear)
    # 01: (Bear, Bull)
    # 10: (Bull, Bear)
    # 11: (Bull, Bull)
    
    # For each history pair, we list probabilities for [Bear, Bull]
    transitions = {
        (0, 0): [0.8, 0.2],  # Given Bear -> Bear, high probability to continue Bear (0.8)
        (0, 1): [0.4, 0.6],  # Given Bear -> Bull, higher tilt to Bull
        (1, 0): [0.5, 0.5],  # Given Bull -> Bear, equal split
        (1, 1): [0.1, 0.9]   # Given Bull -> Bull, high momentum to stay Bull (0.9)
    }
    
    # Simulation: Start with (Bull, Bull) as initial history
    state_history = [1, 1]  # state_0, state_1
    
    np.random.seed(42) # Seed for reproducibility
    sim_steps = 10
    
    print("--- SECOND ORDER MARKOV SIMULATION ---")
    print(f"Starting History: Day 1={state_history[0]}, Day 2={state_history[1]}")
    
    for t in range(2, 2 + sim_steps):
        prev2 = state_history[t-2]
        prev1 = state_history[t-1]
        
        # Get conditional probabilities
        probs = transitions[(prev2, prev1)]
        
        # Choose next state weighted by probs
        next_state = np.random.choice([0, 1], p=probs)
        state_history.append(next_state)
        
        print(f"Step {t-1}: History=[Day {t-1}:{prev2}, Day {t}:{prev1}] -> Probabilities for Day {t+1}: Bear:{probs[0]:.2f}, Bull:{probs[1]:.2f} -> Selected: {next_state}")

    print("\\nFinal State history:", state_history)

if __name__ == "__main__":
    second_order_markov_transition()
`
  },

  // --- PRACTICAL 5: CORRELATION AND REGRESSION ANALYSIS ---
  {
    id: "5a-karl-pearson",
    category: "Correlation & Regression",
    practicalNum: "Extra-5A",
    title: "Karl Pearson Coefficient Matrix",
    aim: "Compute Karl Pearson's correlation coefficient from scratch without using high-level libraries.",
    formula: "Correlation r = cov(X, Y) / (std(X) * std(Y))\nr = [n * sum(xy) - sum(x)sum(y)] / sqrt( [n*sum(x^2) - (sum(x))^2] * [n*sum(y^2) - (sum(y))^2] )",
    theory: "Karl Pearson's correlation coefficient (r) measures the strength and direction of a linear relationship between two variables. Its value is bounded: -1 <= r <= +1. A value of +1 represents perfect positive linear alignment, -1 represents perfect negative linear alignment, and 0 indicates zero linear correlation.",
    inputsDesc: "Two numeric arrays of paired observations (X and Y) of equal length.",
    outputsDesc: "Single correlation coefficient value (r) and categorization indicating relationship quality.",
    code: `import numpy as np

def calculate_karl_pearson(x, y):
    n = len(x)
    if n != len(y):
        raise ValueError("Arrays must have identical dimensions!")
        
    # Convert vectors to float
    x = np.array(x, dtype=float)
    y = np.array(y, dtype=float)
    
    # Calculate sums
    sum_x = np.sum(x)
    sum_y = np.sum(y)
    sum_x_sq = np.sum(x ** 2)
    sum_y_sq = np.sum(y ** 2)
    sum_xy = np.sum(x * y)
    
    # Apply Pearson correlation formula
    numerator = (n * sum_xy) - (sum_x * sum_y)
    denominator_sq = ((n * sum_x_sq) - (sum_x ** 2)) * ((n * sum_y_sq) - (sum_y ** 2))
    
    if denominator_sq <= 0:
        return 0.0
        
    r = numerator / np.sqrt(denominator_sq)
    return r

if __name__ == "__main__":
    # Sample Dataset: Study Hours vs Exam Score
    study_hours = [2, 4, 5, 7, 8, 10, 12]
    exam_scores = [55, 62, 70, 78, 85, 90, 95]
    
    r_coeff = calculate_karl_pearson(study_hours, exam_scores)
    
    print("Dataset Observations (Pairs):")
    for x, y in zip(study_hours, exam_scores):
        print(f"  Study Hours: {x} -> Exam Score: {y}")
        
    print(f"\\nKarl Pearson Correlation Coefficient (r): {r_coeff:.6f}")
    
    # Interpret r
    if r_coeff > 0.8:
        strength = "Very Strong Positive Linear Relationship"
    elif r_coeff > 0.5:
        strength = "Moderate Positive Linear Relationship"
    elif r_coeff < -0.8:
        strength = "Very Strong Negative Linear Relationship"
    elif r_coeff < -0.5:
        strength = "Moderate Negative Linear Relationship"
    else:
        strength = "Weak or Non-linear Relationship"
        
    print("Interpretation:", strength)
`
  },
  {
    id: "5c-simple-regression",
    category: "Correlation & Regression",
    practicalNum: "5C",
    title: "Simple Linear Regression",
    aim: "Implement Simple Linear Regression on a sample dataset, calculating slope, intercept, and standard error to predict values.",
    formula: "Line equation: Y = β0 + β1 * X\nSlope β1 = Cov(X, Y) / Var(X)\nIntercept β0 = mean(Y) - β1 * mean(X)\nGoodness-of-Fit Coefficient R^2 = 1 - (SS_res / SS_tot)",
    theory: "Simple linear regression models the relationship between a single independent predictor variable X and a dependent variable Y using a straight line. The model calculates the ordinary least squares (OLS) values of slope and y-intercept that minimize the sum of squared residual deviations between observed and predicted points.",
    inputsDesc: "Numeric paired variables X (independent) and Y (dependent).",
    outputsDesc: "Calculated regression parameters (Slope, Intercept, R-squared) and custom evaluation test predictions.",
    code: `import numpy as np
import scipy.stats as stats
import matplotlib.pyplot as plt

def solve_simple_regression():
    # Sample Dataset: Advertising Budget ($ thousands) vs Sales Revenue ($ thousands)
    X = np.array([12, 14, 20, 24, 30, 35, 40, 48], dtype=float) # Independent
    Y = np.array([15, 18, 25, 22, 32, 38, 41, 50], dtype=float) # Dependent
    
    mean_X = np.mean(X)
    mean_Y = np.mean(Y)
    
    # Calculate Slope (beta_1) and Intercept (beta_0) using raw covariance formulas
    cov_XY = np.sum((X - mean_X) * (Y - mean_Y))
    var_X = np.sum((X - mean_X) ** 2)
    
    beta_1 = cov_XY / var_X
    beta_0 = mean_Y - (beta_1 * mean_X)
    
    print("--- MANUAL CALCULATION ---")
    print(f"Mean of X: {mean_X:.2f}")
    print(f"Mean of Y: {mean_Y:.2f}")
    print(f"Calculated Slope (β_1): {beta_1:.4f}")
    print(f"Calculated Intercept (β_0): {beta_0:.4f}")
    
    # Calculate R-squared value
    Y_pred = beta_0 + (beta_1 * X)
    ss_residual = np.sum((Y - Y_pred) ** 2)
    ss_total = np.sum((Y - mean_Y) ** 2)
    r_squared = 1 - (ss_residual / ss_total)
    print(f"Goodness of Fit (R^2): {r_squared:.4f}")
    
    # Verify results using SciPy
    slope, intercept, r_value, p_value, std_err = stats.linregress(X, Y)
    print("\\n--- VERIFICATION WITH SCIPY ---")
    print(f"SciPy Slope: {slope:.4f}")
    print(f"SciPy Intercept: {intercept:.4f}")
    print(f"P-value of Significance: {p_value:.6f}")
    
    # Predict custom val
    test_budget = 28.0
    predicted_sales = beta_0 + (beta_1 * test_budget)
    print(f"\\nPrediction: Advertising Budget of \${test_budget}k -> Estimated Sales: \${predicted_sales:.2f}k")
    
if __name__ == "__main__":
    solve_simple_regression()
`
  },
  {
    id: "5d-multiple-regression",
    category: "Correlation & Regression",
    practicalNum: "Extra-5D",
    title: "Multiple Linear Regression",
    aim: "Implement Multiple Linear Regression using the Normal Equation to resolve matrix equations for coefficient weights.",
    formula: "Model: Y = X * β + ε\nNormal Equation solution: β = (X^T * X)^-1 * X^T * Y",
    theory: "Multiple Linear Regression extends simple regression to model a response Y using two or more independent attributes. Standard Ordinary Least Squares (OLS) can be written as a system of linear matrix equations. Adding a constant '1' column to the X coordinate matrix incorporates the vertical Intercept coefficient parameter β0 along with variables slope multipliers β1, β2... etc.",
    inputsDesc: "Matrix of independent variable columns (X1, X2...) and response target column variable (Y).",
    outputsDesc: "Calculated multi-coefficient variables column vector representing intercept and slopes.",
    code: `import numpy as np

def multiple_linear_regression():
    # Dataset: Predict House Price ($ thousands) based on:
    # X1: Size (sq ft / 100), X2: Number of Bedrooms
    # Column 0 = Size (X1), Column 1 = Bedrooms (X2)
    X_vals = np.array([
        [15, 3],
        [20, 4],
        [12, 2],
        [18, 3],
        [25, 4],
        [30, 5],
        [14, 3]
    ], dtype=float)
    
    Y_vals = np.array([250, 320, 180, 280, 400, 480, 220], dtype=float) # House Prices
    
    n_samples = X_vals.shape[0]
    
    # Concatenate column of 1s to the front of X to solve the intercept (β0)
    X_matrix = np.hstack([np.ones((n_samples, 1)), X_vals])
    
    print("Features matrix with intercept column [1, X1, X2]:")
    print(X_matrix)
    print("\\nTarget vector (Y):", Y_vals)
    
    # Solve Normal Equation coefficients vector: beta = inv(X^T @ X) @ X^T @ Y
    XT_X = X_matrix.T @ X_matrix
    XT_Y = X_matrix.T @ Y_vals
    
    try:
        beta = np.linalg.inv(XT_X) @ XT_Y
        
        print("\\n--- RESOLVED MODEL COEFFICIENTS ---")
        print(f"Intercept (β_0): {beta[0]:.4f}")
        print(f"Size Coefficient (β_1): {beta[1]:.4f} (per 100 sq ft)")
        print(f"Bedroom Coefficient (β_2): {beta[2]:.4f}")
        
        # Output Equation
        print(f"\\nModel Equation: Price = {beta[0]:.2f} + {beta[1]:.2f}*(Size) + {beta[2]:.2f}*(Bedrooms)")
        
        # Test case prediction: 2200 sq ft (X1 = 22), 3 Bedrooms (X2 = 3)
        test_case = np.array([1, 22, 3])
        predicted_price = np.dot(test_case, beta)
        print(f"\\nPrediction for 2200 sqft with 3 Bedrooms: \${predicted_price:.2f}k")
        
    except np.linalg.LinAlgError:
        print("Error: Direct matrix inversion failed. Variables are highly multi-collinear!")

if __name__ == "__main__":
    multiple_linear_regression()
`
  },

  // --- PRACTICAL 6: NUMERICAL METHODS ---
  {
    id: "6a-lagrange",
    category: "Numerical Methods",
    practicalNum: "6A",
    title: "Lagrange's Interpolation Method",
    aim: "Implement Lagrange's Polynomial Interpolation formula from scratch to predict functional value at intermediate positions.",
    formula: "L_i(x) = Product_(j != i) [ (x - x_j) / (x_i - x_j) ]\nP_n(x) = Sum_(i=0..n) [ y_i * L_i(x) ]",
    theory: "Lagrange interpolation is a classical numerical method used to find a polynomial curve that passes exactly through a given set of data points (x_i, y_i). Unlike spline interpolation or linear regression, it does not approximate; it computes weighted basis polynomials L_i(x) which equal 1 at node i and 0 at all other nodes, fitting a unique polynomial of degree at most n-1 for n coordinates.",
    inputsDesc: "List of x coordinate nodes, list of corresponding y values, and target evaluation coordinate position (x).",
    outputsDesc: "Calculated basis term components and the completed interpolated output y value.",
    code: `def lagrange_interpolation(x_points, y_points, target_x):
    n = len(x_points)
    if n != len(y_points):
        raise ValueError("Inputs x_points and y_points must be of equal size!")
        
    interpolated_y = 0.0
    
    # Loop over each term in the Lagrange summation formula
    for i in range(n):
        # Calculate term weight basis polynomial L_i(target_x)
        term_term = 1.0
        for j in range(n):
            if j != i:
                # Multiply term factors: (x - x_j) / (x_i - x_j)
                term_term *= (target_x - x_points[j]) / (x_points[i] - x_points[j])
                
        # Sum term into accumulator: L_i(x) * y_i
        interpolated_y += term_term * y_points[i]
        print(f"Basis polynomial term L_{i}(x = {target_x}) = {term_term:.6f} (Weight for y_{i} = {y_points[i]})")
        
    return interpolated_y

if __name__ == "__main__":
    # Given dataset coordinates where:
    # x points: [5, 6, 9, 11]
    # y = log_10(x) or random relationship points: [12, 13, 14, 16]
    X_nodes = [5, 6, 9, 11]
    Y_nodes = [12, 13, 14, 16]
    
    target = 10.0 # Estimate coordinate position y at x=10
    
    print(f"Nodes X: {X_nodes}")
    print(f"Nodes Y: {Y_nodes}")
    print(f"Evaluating Lagrange interpolation coordinate at target x = {target}:\\n")
    
    result_y = lagrange_interpolation(X_nodes, Y_nodes, target)
    print(f"\\nEstimated Interpolated value y at x={target}: {result_y:.5f}")
`
  }
];
